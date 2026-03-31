<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers;

use FunctionBytes\MercosanAdmin\Models\Page;
use FunctionBytes\MercosanAdmin\Http\Requests\PageRequest;
use Illuminate\Http\Request;

class PageController extends BaseController
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', config('mercosan-admin.pagination.per_page', 20));

        $pages = Page::with('user')
            ->when($request->get('status'), function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->get('search'), function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        if ($request->expectsJson()) {
            return $this->success('Pages retrieved successfully', ['pages' => $pages]);
        }

        return view('mercosan-admin::pages.index', compact('pages'));
    }

    public function create()
    {
        return view('mercosan-admin::pages.create');
    }

    public function store(PageRequest $request)
    {
        $page = Page::create($request->validated());

        if ($request->expectsJson()) {
            return $this->success('Page created successfully', ['page' => $page]);
        }

        return redirect()->route('mercosan-admin.pages.edit', $page->id)
            ->with('success', 'Page created successfully');
    }

    public function show(Page $page)
    {
        $page->load('user');

        if (request()->expectsJson()) {
            return $this->success('Page retrieved successfully', ['page' => $page]);
        }

        return view('mercosan-admin::pages.show', compact('page'));
    }

    public function edit(Page $page)
    {
        return view('mercosan-admin::pages.edit', compact('page'));
    }

    public function update(PageRequest $request, Page $page)
    {
        $page->update($request->validated());

        if ($request->expectsJson()) {
            return $this->success('Page updated successfully', ['page' => $page]);
        }

        return redirect()->route('mercosan-admin.pages.edit', $page->id)
            ->with('success', 'Page updated successfully');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        if (request()->expectsJson()) {
            return $this->success('Page deleted successfully');
        }

        return redirect()->route('mercosan-admin.pages.index')
            ->with('success', 'Page deleted successfully');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return $this->error('No pages selected');
        }

        Page::whereIn('id', $ids)->delete();

        return $this->success('Pages deleted successfully');
    }

    public function changeStatus(Page $page, Request $request)
    {
        $status = $request->input('status');

        if (!in_array($status, ['published', 'draft', 'pending'])) {
            return $this->error('Invalid status');
        }

        $page->update(['status' => $status]);

        return $this->success('Page status updated successfully', ['page' => $page]);
    }
}
