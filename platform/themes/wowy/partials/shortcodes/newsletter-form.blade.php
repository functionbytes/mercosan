<section class="newsletter bg-brand p-30 text-white wow fadeIn animated">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-7 mb-md-6 mb-lg-0">
                <div class="row align-items-center">
                    <div class="col flex-horizontal-center">
                        <img class="icon-email" src="{{ Theme::asset()->url('images/icons/icon-email.svg') }}" alt="icon">
                        <div class="row align-items-center">
                            <h4 class="font-size-20 mb-0 ml-3">{!! BaseHelper::clean($title) !!}</h4>
                            <h5 class="font-size-15 ml-4 mb-0">{!! BaseHelper::clean($description) !!}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <a class="btn w-100" href="/suscripciones">Suscribirme</a>
            </div>
        </div>
    </div>
</section>
