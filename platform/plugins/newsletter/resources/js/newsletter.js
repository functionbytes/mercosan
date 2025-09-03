$(() => {
    console.log('Newsletter popup script loaded')
    const $newsletterPopup = $('#newsletter-popup')
    
    console.log('Newsletter popup element found:', $newsletterPopup.length > 0)

    const newsletterDelayTime = $newsletterPopup.data('delay') * 1000 || 5000
    console.log('Popup delay:', newsletterDelayTime / 1000, 'seconds')

    const dontShowAgain = (milliseconds) => {
        const expires = new Date()
        const cookieTime = milliseconds || (60 * 60 * 1000) // 1 hora por defecto
        expires.setTime(expires.getTime() + cookieTime)
        document.cookie = `newsletter_popup=1; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
        console.log('Newsletter popup cookie set for:', cookieTime / 1000 / 60, 'minutes')
    }

    const getCookie = (name) => {
        const nameEQ = name + "="
        const ca = document.cookie.split(';')
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    const deleteCookie = (name) => {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        console.log('Cookie deleted:', name)
    }

    if ($newsletterPopup.length > 0) {
        const hasPopupCookie = getCookie("newsletter_popup")
        console.log('Newsletter popup cookie status:', hasPopupCookie)
        
        if (!hasPopupCookie) {
            console.log('Loading newsletter popup...')
            fetch($newsletterPopup.data('url'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(({ data }) => {
                // Solo mostrar el popup si show_popup es true
                if (data.show_popup === false) {
                    console.log('Usuario ya suscrito o no debe mostrar popup:', data.message);
                    return;
                }

                $newsletterPopup.html(data.html);

                if (typeof Theme !== 'undefined' && typeof Theme.lazyLoadInstance !== 'undefined') {
                    Theme.lazyLoadInstance.update()
                }

                setTimeout(() => {
                    if ($newsletterPopup.find('.newsletter-popup-content').length) {
                        $newsletterPopup.modal('show')
                    }
                }, newsletterDelayTime)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        }

        $newsletterPopup
            .on('show.bs.modal', () => {
                const dialog = $newsletterPopup.find('.modal-dialog')

                dialog.css('margin-top', (Math.max(0, ($(window).height() - dialog.height()) / 2) / 2))
            })
            .on('hide.bs.modal', () => {
                const checkbox = $newsletterPopup.find('form').find('input[name="dont_show_again"]')
                const dontShowAgainChecked = checkbox.is(':checked')
                console.log('Modal closing, dont show again:', dontShowAgainChecked)

                if (dontShowAgainChecked) {
                    // No mostrar más (30 días)
                    dontShowAgain(30 * 24 * 60 * 60 * 1000) // 30 días
                } else {
                    // Mostrar después de 1 hora
                    dontShowAgain(60 * 60 * 1000) // 1 hora
                }
            })

        document.addEventListener('newsletter.subscribed', () => {
            console.log('User subscribed, setting cookie for 7 days')
            // Cuando se suscriben, no mostrar por 7 días
            dontShowAgain(7 * 24 * 60 * 60 * 1000) // 7 días
        })

        let showError = function (message) {
            // Show error using browser alert or toast notification
            alert('Error: ' + message)
        }

        let showSuccess = function (message) {
            // Show success using browser alert or toast notification
            alert('Éxito: ' + message)
        }

        let handleError = function (data) {
            if (typeof data.errors !== 'undefined' && data.errors.length) {
                handleValidationError(data.errors)
            } else {
                if (typeof data.responseJSON !== 'undefined') {
                    if (typeof data.responseJSON.errors !== 'undefined') {
                        if (data.status === 422) {
                            handleValidationError(data.responseJSON.errors)
                        }
                    } else if (typeof data.responseJSON.message !== 'undefined') {
                        showError(data.responseJSON.message)
                    } else {
                        $.each(data.responseJSON, (index, el) => {
                            $.each(el, (key, item) => {
                                showError(item)
                            })
                        })
                    }
                } else {
                    showError(data.statusText)
                }
            }
        }

        let handleValidationError = function (errors) {
            let message = ''
            $.each(errors, (index, item) => {
                if (message !== '') {
                    message += '<br />'
                }
                message += item
            })
            showError(message)
        }

        $(document).on('submit', 'form.bb-newsletter-popup-form', (e) => {
            e.preventDefault()

            const $form = $(e.currentTarget)
            const $button = $form.find('button[type=submit]')

            $.ajax({
                type: 'POST',
                cache: false,
                url: $form.prop('action'),
                data: new FormData($form[0]),
                contentType: false,
                processData: false,
                beforeSend: () => $button.prop('disabled', true).addClass('btn-loading'),
                success: ({ error, message }) => {
                    if (error) {
                        showError(message)

                        return
                    }

                    $form.find('input[name="email"]').val('')

                    showSuccess(message)

                    document.dispatchEvent(new CustomEvent('newsletter.subscribed'))

                    setTimeout(() => {
                        $newsletterPopup.modal('hide')
                    }, 2000)
                },
                error: (error) => handleError(error),
                complete: () => {
                    if (typeof refreshRecaptcha !== 'undefined') {
                        refreshRecaptcha()
                    }

                    $button.prop('disabled', false).removeClass('btn-loading')
                },
            })
        })
    }

    // Funciones globales para debugging
    window.newsletterPopupDebug = {
        getCookie,
        deleteCookie,
        clearPopupCookie() {
            deleteCookie('newsletter_popup')
            console.log('Newsletter popup cookie cleared. Refresh page to see popup again.')
        },
        showPopup() {
            if ($newsletterPopup.length > 0) {
                deleteCookie('newsletter_popup')
                location.reload()
            }
        }
    }

    console.log('Newsletter popup debug functions available:', Object.keys(window.newsletterPopupDebug))
})
