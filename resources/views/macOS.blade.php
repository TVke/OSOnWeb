@extends('layout')
@section('title','macOS')
@section('content')
    <nav class="top-menu">
        <ul>
            <li><a href="."></a></li>
            <li><a href=".">{{ ucfirst(__('macOS.Finder')) }}</a></li>
        </ul>
        <ul>
            <li>
                @php
                    setlocale(LC_TIME, app()->getLocale().'_BE');
                @endphp
                <a href="." id="clock">{{ \Carbon\Carbon::now()->addHour()->formatLocalized('%a %e %b. %H:%M:%S') }}</a>
            </li>
            <li><a id="spotlight" href="."><img src="{{ asset('/img/spotlight.png') }}" alt="{{ __('macOS.Spotlight') }}"></a></li>
            <li><a id="siri" href="."><img src="{{ asset('/img/siri.png') }}" alt="{{ __('macOS.Siri') }}"></a></li>
            <li><a id="notifications" href="."><img src="{{ asset('/img/notifications.png') }}" alt="{{ __('macOS.Notifications') }}"></a></li>
        </ul>
    </nav>

    <div id="open-windows"></div>

    <nav class="absolute pin-b w-full flex h-28 z-50">
        <div class="dock">
            <ul>
                @foreach($apps as $app)
                    <li class="{{ ($loop->first)?" active":"" }}">
                        <figure>
                            <figcaption data-name="{{ $app->name }}">{{ __('macOS.'.$app->name) }}</figcaption>
                            <div class="arrow"></div>
                            <img src="{{ asset($app->preview) }}" alt="{{ __('macOS.'.$app->name) }}">
                        </figure>
                        <div class="menu">
                            @if($app->name !== "Launchpad" && $app->name !== "Finder" )
                                <p data-action="show" data-open="{{ $app->id }}">{{ __('macOS.show') }} {{ __('macOS.inside') }} {{ __('macOS.Finder') }}</p>
                                <hr>
                                <p data-action="open" data-load="{{ $app->file }}" data-toggle="{{ __('macOS.quit') }}" data-toggle-action="stop" data-toggle-load="{{ $app->name }}">{{ __('macOS.open') }}</p>
                            @endif
                            @if($app->name === "Finder")
                                <p data-action="new" data-load="{{ $app->id }}">{{ __('macOS.new') }} {{ __('macOS.Finder') }} {{ __('macOS.window') }}</p>
                                <hr>
                                <p data-action="restart">{{ __('macOS.restart') }}</p>
                            @endif
                            @if($app->name === "Launchpad")
                                <p data-action="open" data-load="{{ $app->file }}">{{ __('macOS.show') }} {{ __('macOS.Launchpad') }}</p>
                            @endif
                        </div>
                        <div class="arrow"></div>
                    </li>
                @endforeach
            </ul>
            <div class="vr"></div>
            <ul>
                @foreach($folders as $folder)
                    <li>
                        <figure>
                            <figcaption>{{ __('macOS.'.$folder->name) }}</figcaption>
                            <div class="arrow"></div>
                            <img src="{{ asset($folder->visual) }}" alt="{{ __('macOS.'.$folder->name) }}">
                        </figure>
                        <div class="menu">
                            {{--@if($folder->name !== "Trash")--}}
                                {{--<p data-action="new" data-open="{{ $folder->id }}">{{ __('macOS.show') }} {{ __('macOS.inside') }} {{ __('macOS.Finder') }}</p>--}}
                                {{--<hr>--}}
                                {{--<p data-action="new" data-open="{{ $folder->id }}">{{ __('macOS.open') }} '{{ $folder->name }}'</p>--}}
                            {{--@endif--}}
                            @if($folder->name === "Trash")
                                <p data-action="new" data-open="{{ $folder->id }}">{{ __('macOS.open') }}</p>
                                <hr>
                                <p class="disabled" data-action="empty">{{ __('macOS.empty') }}</p>
                            @endif
                        </div>
                        <div class="arrow"></div>
                    </li>
                @endforeach
            </ul>
        </div>
    </nav>
@endsection