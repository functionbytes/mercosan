<form action="{{ ! empty($route) ? route($route, $order->id) : route('orders.edit', $order->id) }}">
    <x-core::form.textarea
        :label="(trans('plugins/ecommerce::order.note') . ' ' . trans('plugins/ecommerce::order.note_description'))"
        name="description"
        :placeholder="trans('plugins/ecommerce::order.add_note')"
        :helper-text="trans('plugins/ecommerce::order.add_note_helper')"
        :value="$order->description"
        class="textarea-auto-height"
    />

    <x-core::form.textarea
        :label="trans('plugins/ecommerce::order.admin_private_notes')"
        name="private_notes"
        :placeholder="trans('plugins/ecommerce::order.add_note')"
        :helper-text="trans('plugins/ecommerce::order.admin_private_notes_helper')"
        :value="$order->private_notes"
        class="textarea-auto-height"
    />

    <div class="row">
        <div class="col-md-6">
            <x-core::form.text-input
                :label="trans('plugins/ecommerce::order.delivery_date')"
                name="delivery_date"
                type="date"
                :value="$order->delivery_date ? $order->delivery_date->format('Y-m-d') : ''"
                :helper-text="trans('plugins/ecommerce::order.delivery_date_helper')"
            />
        </div>
        <div class="col-md-6">
            <x-core::form.text-input
                :label="trans('plugins/ecommerce::order.delivery_time')"
                name="delivery_time"
                type="time"
                :value="$order->delivery_time"
                :helper-text="trans('plugins/ecommerce::order.delivery_time_helper')"
            />
        </div>
    </div>

    <x-core::button type="button" class="btn-update-order">
        {{ trans('plugins/ecommerce::order.save') }}
    </x-core::button>
</form>
