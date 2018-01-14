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

    <div id="open-windows">
        <div class="window activated Calculator">
            <div class="window-buttons">
                <a href="." class="close"></a>
                <a href="." class="minimize"></a>
                <a href="." class="enlarge"></a>
            </div>
            <output>0</output>
            <div class="basic-buttons">
                <button>AC</button>
                <button>+⧸- ⁺⧸₋</button>
                <button>%</button>
                <button>÷</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>x</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>-</button>
                <button>3</button>
                <button>2</button>
                <button>1</button>
                <button>+</button>
                <button class="zero">0</button>
                <button>,</button>
                <button>=</button>
            </div>
        </div>
        <div class="window Settings activated">
            <div class="window-buttons">
                <a href="." class="close"></a>
                <a href="." class="minimize"></a>
                <a href="." class="enlarge"></a>
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