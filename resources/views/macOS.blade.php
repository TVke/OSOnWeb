@extends('layout')
@section('title','macOS')
@section('content')
	<nav class="absolute pin-b w-full flex">
		<ul class="list-reset flex mx-auto p-4 dock relative">
			<li>
				<figure>
					<figcaption>{{ __('macOS.Finder') }}</figcaption>
					<img src="{{ asset('img/Finder.png') }}" alt="{{ __('macOS.Finder') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Launchpad') }}</figcaption>
					<img src="{{ asset('img/Launchpad.png') }}" alt="{{ __('macOS.Launchpad') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Calculator') }}</figcaption>
					<img src="{{ asset('img/Calculator.png') }}" alt="{{ __('macOS.Calculator') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Notes') }}</figcaption>
					<img src="{{ asset('img/Notes.png') }}" alt="{{ __('macOS.Notes') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Settings') }}</figcaption>
					<img src="{{ asset('img/Settings.png') }}" alt="{{ __('macOS.Settings') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Reminders') }}</figcaption>
					<img src="{{ asset('img/Reminders.png') }}" alt="{{ __('macOS.Reminders') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Agenda') }}</figcaption>
					<img src="{{ asset('img/Agenda.png') }}" alt="{{ __('macOS.Agenda') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Contacts') }}</figcaption>
					<img src="{{ asset('img/Contacts.png') }}" alt="{{ __('macOS.Contacts') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Sticky Notes') }}</figcaption>
					<img src="{{ asset('img/Sticky Notes.png') }}" alt="{{ __('macOS.Sticky Notes') }}">
				</figure>
			</li>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Terminal') }}</figcaption>
					<img src="{{ asset('img/Terminal.png') }}" alt="{{ __('macOS.Terminal') }}">
				</figure>
			</li>
			<vr></vr>
			<li>
				<figure>
					<figcaption>{{ __('macOS.Trash') }}</figcaption>
					<img src="{{ asset('img/Trash.png') }}" alt="{{ __('macOS.Trash') }}">
				</figure>
			</li>
		</ul>
	</nav>
@endsection