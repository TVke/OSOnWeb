@extends('layout')
@section('title','macOS')
@section('content')
    <nav class="absolute pin-b w-full flex">
		<ul class="list-reset flex mx-auto dock relative h-28">
            @foreach($apps as $app)
                <li class="z-10 relative">
                    <figure class="relative">
                        <figcaption class="block absolute py-1 px-3 rounded mx-auto text-center bg-grey-lightest text-black shadow font-hairline text-xs">{{ __('macOS.'.$app->name) }}</figcaption>
                        <div class="arrow block w-0 h-0 absolute mx-auto pin-x opacity-0"></div>
                        <img src="{{ asset($app->file) }}" alt="{{ __('macOS.'.$app->name) }}" class="block w-24">
                    </figure>
                    <menu type="context" class="block absolute rounded font-hairline text-xs bg-grey-lightest py-1 px-3 shadow opacity-0">
                        <menuitem>{{ __('macOS.open') }}</menuitem>
                    </menu>
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
                    <menu type="context" class="block absolute rounded font-hairline text-xs bg-grey-lightest py-1 px-3 shadow opacity-0">
                        <menuitem>{{ __('macOS.open') }}</menuitem>
                    </menu>
                    <div class="arrow block w-0 h-0 absolute mx-auto pin-x opacity-0"></div>
                </li>
            @endforeach
        </ul>
	</nav>
@endsection