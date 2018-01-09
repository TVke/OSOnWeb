@extends('layout')
@section('title','macOS')
@section('content')
    <nav class="top-menu absolute pin-x pin-t px-2.5 backdrop-blur-30 h-5 shadow-lg border-b flex justify-between text-sm">
        <ul class="list-reset flex justify-start">
            <li class="flex px-2.5"><p class="my-auto text-lg"></p></li>
            @foreach($firstMenubar as $menuItem)
                <li class="flex px-2.5">
                    <p class="my-auto{{($loop->first)?" font-semibold":""}}">{{ ucfirst(__('macOS.'.$menuItem)) }}</p>
                </li>
            @endforeach
            <li></li>
        </ul>
        <ul class="list-reset flex justify-end">
            <li class="flex px-2.5">
                @php
                    setlocale(LC_TIME, app()->getLocale().'_BE');
                @endphp
                <p class="my-auto">{{ ucfirst(\Carbon\Carbon::now()->formatLocalized('%a %e %b. %H:%M:%S')) }}</p>
            </li>
        </ul>
    </nav>

    <nav class="absolute pin-b w-full flex">
		<ul class="list-reset flex mx-auto dock relative h-28">
            @foreach($apps as $app)
                <li class="z-10 relative">
                    <figure class="relative">
                        <figcaption class="block absolute py-1 px-3 rounded mx-auto text-center bg-grey-lightest text-black shadow font-hairline text-xs">{{ __('macOS.'.$app->name) }}</figcaption>
                        <div class="arrow block w-0 h-0 absolute mx-auto pin-x opacity-0"></div>
                        <img src="{{ asset($app->file) }}" alt="{{ __('macOS.'.$app->name) }}" class="block w-24">
                    </figure>
                    <div class="menu block absolute rounded font-light text-xs bg-grey-lighter pt-px shadow-lg opacity-0">
                        @if($app->name !== "Launchpad")
                            <p class="block py-0.5 px-4 my-0.75">{{ __('macOS.show') }} {{ __('macOS.inside') }} {{ __('macOS.Finder') }}</p>
                            <hr>
                            <p class="block py-0.5 px-4 my-0.75">{{ __('macOS.open') }}</p>
                        @else
                            {{--<p class="block py-0.5 px-4 my-0.75">{{ __('macOS.remove') }}</p>--}}
                            {{--<hr>--}}
                            <p class="block py-0.5 px-4 my-0.75">{{ __('macOS.show') }} {{ __('macOS.Launchpad') }}</p>
                        @endif
                    </div>
                    <div class="arrow block w-0 h-0 absolute mx-auto pin-x opacity-0"></div>
                </li>
            @endforeach
        <div class="vr relative z-10 block w-px mx-4 my-2"></div>
            @foreach($folders as $folder)
                <li class="z-10 relative">
                    <figure class="relative">
                        <figcaption class="block absolute py-1 px-3 rounded mx-auto text-center bg-grey-lightest text-black shadow font-hairline text-xs">{{ __('macOS.'.$folder->name) }}</figcaption>
                        <div class="arrow block w-0 h-0 absolute mx-auto pin-x opacity-0"></div>
                        <img src="{{ asset($folder->visual) }}" alt="{{ __('macOS.'.$folder->name) }}" class="block w-24">
                    </figure>
                    <div class="menu block absolute rounded font-light text-xs bg-grey-lighter pt-px shadow-lg opacity-0">
                        @if($folder->name !== "Trash")
                            <p class="block py-0.5 px-4 my-0.75">{{ __('macOS.show') }} {{ __('macOS.inside') }} {{ __('macOS.Finder') }}</p>
                            <hr>
                        @endif
                        <p class="block py-0.5 px-4 my-0.75">{{ __('macOS.open') }}</p>
                            @if($folder->name === "Trash")
                                <hr>
                                <p class="block py-0.5 px-4 my-0.75">{{ __('macOS.empty') }}</p>
                            @endif
                    </div>
                    <div class="arrow block w-0 h-0 absolute mx-auto pin-x opacity-0"></div>
                </li>
            @endforeach
        </ul>
	</nav>
@endsection