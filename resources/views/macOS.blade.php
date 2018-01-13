@extends('layout')
@section('title','macOS')
@section('content')
    <nav class="top-menu">
        <ul>
            <li><p></p></li>
            <li><p>{{ ucfirst(__('macOS.Finder')) }}</p></li>
        </ul>
        <ul>
            <li>
                @php
                    setlocale(LC_TIME, app()->getLocale().'_BE');
                @endphp
                <p id="clock">{{ \Carbon\Carbon::now()->addHour()->formatLocalized('%a %e %b. %H:%M:%S') }}</p>
            </li>
            <li><img id="spotlight" src="{{ asset('/img/spotlight.png') }}" alt="{{ __('macOS.Spotlight') }}"></li>
            <li><img id="siri" src="{{ asset('/img/siri.png') }}" alt="{{ __('macOS.Siri') }}"></li>
            <li><img id="notifications" src="{{ asset('/img/notifications.png') }}" alt="{{ __('macOS.Notifications') }}"></li>
        </ul>
    </nav>

    <div id="open-windows">
        <div class="window activated Calculator">
            <div class="window-buttons">
                <div class="close"></div>
                <div class="minimize"></div>
                <div class="enlarge"></div>
            </div>

        </div>
    </div>

    <nav class="absolute pin-b w-full flex h-28">
        <div class="dock">
		<ul>
            @foreach($apps as $app)
                <li class="{{ ($loop->first)?" active":"" }}">
                    <figure>
                        <figcaption>{{ __('macOS.'.$app->name) }}</figcaption>
                        <div class="arrow"></div>
                        <img src="{{ asset($app->preview) }}" alt="{{ __('macOS.'.$app->name) }}">
                    </figure>
                    <div class="menu">
                        @if($app->name !== "Launchpad")
                            <p data-action="show" data-open="{{ $app->file }}">{{ __('macOS.show') }} {{ __('macOS.inside') }} {{ __('macOS.Finder') }}</p>
                            <hr>
                            <p data-action="open" data-load="{{ $app->file }}">{{ __('macOS.open') }}</p>
                        @elseif($app->name === "Finder")
                            <p data-action="show" data-open=".">{{ __('macOS.new') }} {{ __('macOS.Finder') }} {{ __('macOS.window') }}</p>
                            <hr>
                            <p data-action="restart">{{ __('macOS.restart') }}</p>
                        @else
                            {{--<p>{{ __('macOS.remove') }}</p>--}}
                            {{--<hr>--}}
                            <p data-action="show" data-load="{{ $app->file }}">{{ __('macOS.show') }} {{ __('macOS.Launchpad') }}</p>
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
                        @if($folder->name !== "Trash")
                            <p data-action="show" data-open="{{ $app->file }}">{{ __('macOS.show') }} {{ __('macOS.inside') }} {{ __('macOS.Finder') }}</p>
                            <hr>
                        @endif
                        <p data-action="open" data-open="{{ $app->file }}">{{ __('macOS.open') }}</p>
                            @if($folder->name === "Trash")
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