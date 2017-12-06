<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<title>@yield('title')</title>
	<link rel="stylesheet" href="/css/@yield('title').css">
</head>
<body class="bg-desktop">
@yield('content')
<script src="/js/@yield('title').js"></script>
</body>
</html>