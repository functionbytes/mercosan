<?php

namespace FunctionBytes\MercosanAdmin\Traits;

trait HasPreferences
{
    public function getPreference(string $key, $default = null)
    {
        return $this->getMeta("preference_{$key}", $default);
    }

    public function setPreference(string $key, $value): void
    {
        $this->setMeta("preference_{$key}", $value);
    }

    public function hasPreference(string $key): bool
    {
        return $this->meta()->where('key', "preference_{$key}")->exists();
    }

    public function forgetPreference(string $key): void
    {
        $this->meta()->where('key', "preference_{$key}")->delete();
    }

    public function getAllPreferences(): array
    {
        $preferences = [];
        $metas = $this->meta()->where('key', 'like', 'preference_%')->get();

        foreach ($metas as $meta) {
            $key = str_replace('preference_', '', $meta->key);
            $preferences[$key] = $meta->value;
        }

        return $preferences;
    }
}
