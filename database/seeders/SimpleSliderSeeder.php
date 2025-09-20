<?php

namespace Database\Seeders;

use Botble\Base\Facades\MetaBox;
use Botble\Base\Supports\BaseSeeder;
use Botble\Language\Models\LanguageMeta;
use Botble\SimpleSlider\Models\SimpleSlider;
use Botble\SimpleSlider\Models\SimpleSliderItem;
use Illuminate\Support\Arr;

class SimpleSliderSeeder extends BaseSeeder
{
    public function run(): void
    {
        $this->uploadFiles('sliders');

        SimpleSlider::query()->truncate();
        SimpleSliderItem::query()->truncate();

        $sliders = [
            [
                'name' => 'Home slider 1',
                'key' => 'home-slider-1',
                'total' => 3,
                'style' => '',
            ],
            [
                'name' => 'Home slider 2',
                'key' => 'home-slider-2',
                'total' => 3,
                'style' => 'style-2',
            ],
            [
                'name' => 'Home slider 3',
                'key' => 'home-slider-3',
                'total' => 2,
                'style' => 'style-3',
            ],
            [
                'name' => 'Home slider 4',
                'key' => 'home-slider-4',
                'total' => 3,
                'style' => 'style-4',
            ],
        ];

        $sliderItems = [
            [
                'title' => 'Ofertas Súper Valor',
                'link' => '/products',
                'description' => 'Ahorra más con cupones y hasta un 70% de descuento',
                'button_text' => 'Comprar ahora',
                'subtitle' => 'Oferta de intercambio',
                'highlight_text' => 'En todos los productos',
            ],
            [
                'title' => 'Tendencias Tech',
                'link' => '/products',
                'description' => 'Ahorra más con cupones y hasta un 20% de descuento',
                'button_text' => 'Descubrir ahora',
                'subtitle' => 'Promociones tecnológicas',
                'highlight_text' => 'Gran colección',
            ],
            [
                'title' => 'Grandes ofertas de',
                'link' => '/products',
                'description' => 'Auriculares, portátiles gaming, PC y más...',
                'button_text' => 'Comprar ahora',
                'subtitle' => 'Próxima oferta',
                'highlight_text' => 'Fabricante',
            ],
        ];

        foreach ($sliders as $index => $value) {
            $slider = SimpleSlider::query()->create(Arr::only($value, ['name', 'key']));

            LanguageMeta::saveMetaData($slider);

            if ($value['style']) {
                MetaBox::saveMetaBoxData($slider, 'simple_slider_style', $value['style']);
            }

            foreach (collect($sliderItems)->take($value['total']) as $key => $item) {
                $item['image'] = 'sliders/' . ($index + 1) . '-' . ($key + 1) . '.png';
                $item['order'] = $key + 1;
                $item['simple_slider_id'] = $slider->id;

                $sliderItem = SimpleSliderItem::query()->create(
                    Arr::except($item, ['button_text', 'subtitle', 'highlight_text'])
                );

                MetaBox::saveMetaBoxData($sliderItem, 'button_text', $item['button_text']);
                MetaBox::saveMetaBoxData($sliderItem, 'subtitle', $item['subtitle']);
                MetaBox::saveMetaBoxData($sliderItem, 'highlight_text', $item['highlight_text']);
            }
        }
    }
}
