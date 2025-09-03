$((function() {
    console.log('Newsletter popup script loaded');
    var e = $("#newsletter-popup")
        , t = 1e3 * e.data("delay") || 5e3;
    
    console.log('Newsletter popup element found:', e.length > 0);
    console.log('Popup delay:', t / 1000, 'seconds');
    
    var n = function(milliseconds) {
        var expires = new Date;
        var cookieTime = milliseconds || (60 * 60 * 1000); // 1 hora por defecto
        expires.setTime(expires.getTime() + cookieTime);
        document.cookie = "newsletter_popup=1; expires=" + expires.toUTCString() + "; path=/; SameSite=Lax";
        console.log('Newsletter popup cookie set for:', cookieTime / 1000 / 60, 'minutes');
    };

    var getCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    var deleteCookie = function(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log('Cookie deleted:', name);
    };
    
    // Define missing functions for error handling
    var o = function(message) {
        $(".newsletter-error-message").html(message).show();
    };
    
    var r = function(errors) {
        var errorMessage = "";
        $.each(errors, function(field, messages) {
            if (Array.isArray(messages)) {
                $.each(messages, function(index, message) {
                    errorMessage += message + "<br>";
                });
            } else {
                errorMessage += messages + "<br>";
            }
        });
        o(errorMessage);
    };

    if (e.length > 0) {
        // Verificar cookie usando la función mejorada
        var hasPopupCookie = getCookie("newsletter_popup");
        console.log('Newsletter popup cookie status:', hasPopupCookie);
        
        if (!hasPopupCookie) {
            console.log('Loading newsletter popup...');
            console.log('Popup URL:', e.data('url'));
            
            fetch(e.data("url"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }).then((function(response) {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })).then((function(response) {
                console.log('Popup data received:', response);
                
                // Acceder a la data correctamente
                var data = response.data || response;
                
                if (data.show_popup === false) {
                    console.log('Usuario ya suscrito o no debe mostrar popup:', data.message);
                    return;
                }
                
                console.log('Setting popup HTML...');
                console.log('HTML content:', data.html ? data.html.substring(0, 200) : 'HTML is empty!');
                e.html(data.html);
                
                if ("undefined" != typeof Theme && void 0 !== Theme.lazyLoadInstance) {
                    Theme.lazyLoadInstance.update();
                }
                
                // Limpiar reCAPTCHA duplicados y reinicializar
                setTimeout(function() {
                    var recaptchaElements = e.find('.g-recaptcha');
                    console.log('Found', recaptchaElements.length, 'reCAPTCHA elements');
                    
                    if (recaptchaElements.length > 1) {
                        console.log('Removing duplicate reCAPTCHA elements');
                        recaptchaElements.slice(1).remove(); // Remover duplicados
                        recaptchaElements = e.find('.g-recaptcha'); // Actualizar lista
                    }
                    
                    console.log('grecaptcha available:', typeof grecaptcha !== 'undefined');
                    console.log('window.grecaptcha:', typeof window.grecaptcha);
                    console.log('reCAPTCHA elements found:', recaptchaElements.length);
                    
                    if (recaptchaElements.length > 0) {
                        console.log('reCAPTCHA element HTML:', recaptchaElements[0].outerHTML);
                        
                        if (typeof grecaptcha !== 'undefined' || typeof window.grecaptcha !== 'undefined') {
                            console.log('Initializing reCAPTCHA for popup');
                            var grecaptchaObj = window.grecaptcha || grecaptcha;
                        
                        // Esperar a que grecaptcha esté listo
                        var initRecaptcha = function() {
                            try {
                                var recaptchaElement = recaptchaElements[0];
                                var sitekey = $(recaptchaElement).data('sitekey');
                                
                                console.log('Rendering reCAPTCHA with sitekey:', sitekey);
                                
                                var widgetId = grecaptchaObj.render(recaptchaElement, {
                                    'sitekey': sitekey,
                                    'callback': 'recaptchaCallback',
                                    'expired-callback': 'recaptchaExpiredCallback'
                                });
                                
                                // Guardar el widget ID para uso posterior
                                $(recaptchaElement).data('widget-id', widgetId);
                                console.log('reCAPTCHA successfully rendered for popup with widget ID:', widgetId);
                            } catch (error) {
                                console.log('reCAPTCHA render error:', error);
                                // Reintentar después de un momento
                                setTimeout(initRecaptcha, 500);
                            }
                        };
                        
                            if (typeof grecaptchaObj.render === 'function') {
                                initRecaptcha();
                            } else {
                                console.log('Waiting for grecaptcha to load...');
                                setTimeout(initRecaptcha, 1000);
                            }
                        } else {
                            console.log('grecaptcha is not available - checking if script needs to be loaded');
                            
                            // Verificar si el script de reCAPTCHA está cargado
                            var recaptchaScript = document.querySelector('script[src*="recaptcha"]');
                            if (!recaptchaScript) {
                                console.log('Loading reCAPTCHA script dynamically...');
                                var script = document.createElement('script');
                                script.src = 'https://www.google.com/recaptcha/api.js';
                                script.onload = function() {
                                    console.log('reCAPTCHA script loaded, reinitializing...');
                                    setTimeout(function() {
                                        if (typeof window.grecaptcha !== 'undefined') {
                                            console.log('Reinitializing reCAPTCHA after script load');
                                            var grecaptchaObj = window.grecaptcha;
                                            var initRecaptcha = function() {
                                                try {
                                                    var recaptchaElement = recaptchaElements[0];
                                                    var sitekey = $(recaptchaElement).data('sitekey');
                                                    
                                                    console.log('Rendering reCAPTCHA with sitekey:', sitekey);
                                                    
                                                    var widgetId = grecaptchaObj.render(recaptchaElement, {
                                                        'sitekey': sitekey,
                                                        'callback': 'recaptchaCallback',
                                                        'expired-callback': 'recaptchaExpiredCallback'
                                                    });
                                                    
                                                    $(recaptchaElement).data('widget-id', widgetId);
                                                    console.log('reCAPTCHA successfully rendered after dynamic load with widget ID:', widgetId);
                                                } catch (error) {
                                                    console.log('reCAPTCHA render error after dynamic load:', error);
                                                }
                                            };
                                            initRecaptcha();
                                        }
                                    }, 500);
                                };
                                document.head.appendChild(script);
                            } else {
                                console.log('reCAPTCHA script found but grecaptcha not ready, waiting...');
                                setTimeout(function() {
                                    if (typeof window.grecaptcha !== 'undefined') {
                                        console.log('reCAPTCHA ready after wait, initializing...');
                                        var grecaptchaObj = window.grecaptcha;
                                        try {
                                            var recaptchaElement = recaptchaElements[0];
                                            var sitekey = $(recaptchaElement).data('sitekey');
                                            
                                            var widgetId = grecaptchaObj.render(recaptchaElement, {
                                                'sitekey': sitekey,
                                                'callback': 'recaptchaCallback',
                                                'expired-callback': 'recaptchaExpiredCallback'
                                            });
                                            
                                            $(recaptchaElement).data('widget-id', widgetId);
                                            console.log('reCAPTCHA successfully rendered after wait with widget ID:', widgetId);
                                        } catch (error) {
                                            console.log('reCAPTCHA render error after wait:', error);
                                        }
                                    }
                                }, 2000);
                            }
                        }
                    }
                }, 200);
                
                console.log('Waiting', t / 1000, 'seconds before showing popup...');
                setTimeout((function() {
                    var popupContent = e.find(".newsletter-popup-content");
                    console.log('Popup content found:', popupContent.length > 0);
                    console.log('Popup HTML after setting:', e.html().substring(0, 200));
                    
                    if (popupContent.length) {
                        console.log('Showing modal...');
                        e.modal("show");
                    } else {
                        console.error('No .newsletter-popup-content found, cannot show modal');
                    }
                }), t);
            })).catch((function(error) {
                console.error("Fetch error:", error);
            }));
        }

        e.on("show.bs.modal", (function() {
            var dialog = e.find(".modal-dialog");
            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2) / 2);
        })).on("hide.bs.modal", (function() {
            var existingCookie = getCookie("newsletter_popup");
            console.log('Modal closing, existing cookie:', existingCookie);
            
            // Limpiar el checker de reCAPTCHA cuando se cierra el modal
            if (typeof recaptchaChecker !== 'undefined') {
                clearInterval(recaptchaChecker);
                console.log('reCAPTCHA checker interval cleared');
            }
            
            // NO establecer cookie al cerrar - el popup aparecerá siempre
            // La cookie solo se establece cuando:
            // 1. El usuario marca "No volver a mostrar"
            // 2. El usuario se suscribe exitosamente
            console.log('Modal closed without action - no cookie set, will show again next visit');
        }));

        // Event listener para el checkbox "No volver a mostrar" - Acción INMEDIATA
        $(document).on('change', 'input[name="dont_show_again"]', function() {
            if ($(this).is(':checked')) {
                console.log('User checked "dont show again" - setting cookie immediately');
                // Establecer cookie inmediatamente (30 días)
                n(30 * 24 * 60 * 60 * 1000); // 30 días
                // Cerrar el modal inmediatamente
                setTimeout(function() {
                    e.modal("hide");
                }, 300); // Pequeño delay para que vea que se marcó
            }
        });

        document.addEventListener("newsletter.subscribed", (function() {
            console.log('User subscribed, setting cookie immediately for 7 days');
            // Cuando se suscriben, establecer cookie INMEDIATAMENTE (7 días)
            n(7 * 24 * 60 * 60 * 1000); // 7 días
        }));

        $(document).on("submit", "form.bb-newsletter-popup-form", (function(t) {
            t.preventDefault();
            var form = $(t.currentTarget);
            var button = form.find("button[type=submit]");
            
            // Validar reCAPTCHA si está presente
            var recaptchaField = form.find('.g-recaptcha');
            if (recaptchaField.length > 0) {
                var recaptchaResponse = '';
                try {
                    // Intentar obtener la respuesta usando el widget ID si es posible
                    var widgetId = recaptchaField.data('widget-id');
                    if (widgetId !== undefined) {
                        recaptchaResponse = grecaptcha.getResponse(widgetId);
                    } else {
                        recaptchaResponse = grecaptcha.getResponse();
                    }
                    console.log('reCAPTCHA response:', recaptchaResponse ? 'Valid' : 'Empty');
                } catch (error) {
                    console.log('reCAPTCHA getResponse error:', error);
                }
                
                if (!recaptchaResponse) {
                    o('Por favor, completa la verificación reCAPTCHA.');
                    return false;
                }
                console.log('reCAPTCHA validation passed');
            }
            
            $(".newsletter-success-message").html("").hide();
            $(".newsletter-error-message").html("").hide();
            
            $.ajax({
                type: "POST",
                cache: false,
                url: form.prop("action"),
                data: new FormData(form[0]),
                contentType: false,
                processData: false,
                beforeSend: function() {
                    return button.prop("disabled", true).addClass("btn-loading");
                },
                success: function(data) {
                    var isError = data.error;
                    var message = data.message;
                    
                    if (isError) {
                        o(message);
                    } else {
                        $(".newsletter-success-message").html(message).show();
                        form.find('input[name="name"]').val("");
                        form.find('input[name="email"]').val("");
                        document.dispatchEvent(new CustomEvent("newsletter.subscribed"));
                        setTimeout(function() {
                            e.modal("hide");
                        }, 1500); // Give user time to see success message
                    }
                },
                error: function(response) {
                    if (response.responseJSON) {
                        if (response.responseJSON.errors) {
                            r(response.responseJSON.errors);
                        } else if (response.responseJSON.message) {
                            o(response.responseJSON.message);
                        } else {
                            $.each(response.responseJSON, function(field, messages) {
                                $.each(messages, function(index, message) {
                                    o(message);
                                });
                            });
                        }
                    } else if (response.errors && response.errors.length) {
                        r(response.errors);
                    } else {
                        o(response.statusText || 'An error occurred');
                    }
                },
                complete: function() {
                    if ("undefined" != typeof refreshRecaptcha) {
                        refreshRecaptcha();
                    }
                    button.prop("disabled", false).removeClass("btn-loading");
                }
            });
        }));
    }

    // reCAPTCHA callback functions - defined globally before any widget rendering
    window.recaptchaCallback = function(token) {
        console.log('reCAPTCHA completed, enabling submit button, token:', token ? 'received' : 'empty');
        $('#newsletter-submit-popup-btn').prop('disabled', false);
    };
    
    window.recaptchaExpiredCallback = function() {
        console.log('reCAPTCHA expired, disabling submit button');
        $('#newsletter-submit-popup-btn').prop('disabled', true);
    };

    // Alternative approach: Monitor reCAPTCHA state changes
    var checkRecaptchaStatus = function() {
        var recaptchaElement = $('.g-recaptcha');
        if (recaptchaElement.length > 0) {
            try {
                var response = '';
                var widgetId = recaptchaElement.data('widget-id');
                if (widgetId !== undefined) {
                    response = grecaptcha.getResponse(widgetId);
                } else {
                    response = grecaptcha.getResponse();
                }
                
                var button = $('#newsletter-submit-popup-btn');
                if (response && response.length > 0) {
                    console.log('reCAPTCHA validated, enabling button');
                    button.prop('disabled', false);
                } else {
                    console.log('reCAPTCHA not validated, keeping button disabled');
                    button.prop('disabled', true);
                }
            } catch (error) {
                console.log('Error checking reCAPTCHA status:', error);
            }
        }
    };

    // Check reCAPTCHA status periodically
    var recaptchaChecker = setInterval(function() {
        if (typeof grecaptcha !== 'undefined' && $('.g-recaptcha').length > 0) {
            checkRecaptchaStatus();
        }
    }, 1000);

    // Funciones globales para debugging
    window.newsletterPopupDebug = {
        getCookie: getCookie,
        deleteCookie: deleteCookie,
        clearPopupCookie: function() {
            deleteCookie('newsletter_popup');
            console.log('Newsletter popup cookie cleared. Refresh page to see popup again.');
        },
        showPopup: function() {
            if (e.length > 0) {
                deleteCookie('newsletter_popup');
                location.reload();
            }
        }
    };

    console.log('Newsletter popup debug functions available:', Object.keys(window.newsletterPopupDebug));
}));