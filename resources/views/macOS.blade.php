@extends('layout')
@section('title','macOS')
@section('content')
	<nav class="absolute pin-b w-full flex">
		<ul class="list-reset flex mx-auto dock relative h-28">
            @foreach($apps as $app)
                <li class="z-10 relative">
                    <figure class="relative">
                        <figcaption class="block absolute py-1 px-4 rounded mx-auto text-center bg-grey-lightest text-black shadow">{{ __('macOS.'.$app->name) }}</figcaption>
                        <div class="arrow block w-0 h-0 absolute mx-auto pin-x"></div>
                        <img src="{{ asset($app->file) }}" alt="{{ __('macOS.'.$app->name) }}" class="block w-24">
                    </figure>
                </li>
            @endforeach
                @foreach($folders as $folder)
                    <li class="z-10 relative">
                        <figure class="relative">
                            <figcaption class="block absolute py-1 px-4 rounded mx-auto text-center bg-grey-lightest text-black shadow">{{ __('macOS.'.$folder->name) }}</figcaption>
                            <div class="arrow block w-0 h-0 absolute mx-auto pin-x"></div>
                            <img src="{{ asset($folder->visual) }}" alt="{{ __('macOS.'.$folder->name) }}" class="block w-24">
                        </figure>
                    </li>
                @endforeach
		</ul>
	</nav>
@endsection