@php
    $selectClass ??= '';
    
    // Cargar assets de Select2 para el frontend
    Assets::addStyles(['select2']);
    Assets::addScripts(['select2', 'core']);
@endphp

{!!
    $form->when(! empty($selectClass), function ($form) use ($selectClass) {
            return $form->setFormSelectInputClass($selectClass);
        })->renderForm()
!!}
