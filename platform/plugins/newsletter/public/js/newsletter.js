$((function() {
        var e = $("#newsletter-popup")
            , t = 1e3 * e.data("delay") || 5e3
            , n = function(e) {
            var t = new Date;
            t.setTime(t.getTime() + e),
                document.cookie = "newsletter_popup=1; expires=".concat(t.toUTCString(), "; path=/")
        }
        // Define missing functions for error handling
        , o = function(message) {
            $(".newsletter-error-message").html(message).show();
        }
        , r = function(errors) {
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
            -1 === document.cookie.indexOf("newsletter_popup=1") && fetch(e.data("url"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }).then((function(e) {
                    if (!e.ok)
                        throw new Error("Network response was not ok");
                    return e.json()
                }
            )).then((function(n) {
                    var o = n.data;
                    e.html(o.html),
                    "undefined" != typeof Theme && void 0 !== Theme.lazyLoadInstance && Theme.lazyLoadInstance.update(),
                        setTimeout((function() {
                                e.find(".newsletter-popup-content").length && e.modal("show")
                            }
                        ), t)
                }
            )).catch((function(e) {
                    console.error("Fetch error:", e)
                }
            )),
                e.on("show.bs.modal", (function() {
                        var t = e.find(".modal-dialog");
                        t.css("margin-top", Math.max(0, ($(window).height() - t.height()) / 2) / 2)
                    }
                )).on("hide.bs.modal", (function() {
                        e.find("form").find('input[name="dont_show_again"]').is(":checked") ? n(2592e5) : n(36e5)
                    }
                )),
                document.addEventListener("newsletter.subscribed", (function() {
                        return n()
                    }
                ));

            $(document).on("submit", "form.bb-newsletter-popup-form", (function(t) {
                    t.preventDefault();
                    var n = $(t.currentTarget)
                        , s = n.find("button[type=submit]");
                    $(".newsletter-success-message").html("").hide(),
                        $(".newsletter-error-message").html("").hide(),
                        $.ajax({
                            type: "POST",
                            cache: !1,
                            url: n.prop("action"),
                            data: new FormData(n[0]),
                            contentType: !1,
                            processData: !1,
                            beforeSend: function() {
                                return s.prop("disabled", !0).addClass("btn-loading")
                            },
                            success: function(t) {
                                var isError = t.error
                                    , message = t.message;
                                if (isError) {
                                    o(message);
                                } else {
                                    $(".newsletter-success-message").html(message).show();
                                    n.find('input[name="name"]').val("");
                                    n.find('input[name="email"]').val("");
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
                                "undefined" != typeof refreshRecaptcha && refreshRecaptcha(),
                                    s.prop("disabled", !1).removeClass("btn-loading")
                            }
                        })
                }
            ))
        }
    }
));
