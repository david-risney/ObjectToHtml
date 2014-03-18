# ObjectToHtml
Programmatically create HTML in browser environments with a simple, object based, and concise notation that makes it easy to avoid injection security bugs. Because innerHTML is dangerous and document.createElement is too verbose. It is not a replacement for a real HTML templating library. It is a small simple JS function.

## Example
	var root = ObjectToHtml(
		{div: {id: "top", class: "container"}, c: [
			{h1: {}, t: "Heading"},
			{img: {src: "http://deletethis.net/dave/images/daverecent.png"}},
			{ul: {}, c:[
				{li: {}, t: "Point"},
				{li: {}, t: "Second point"},
				{li: {}, t: "Additional point"},
			]}
		]});

## Syntax
	ObjectToHtml(
		{$tagName: {$attribute1Name: $attribute1Value, ...}, 
			t: $textContent, 
			e: {$event1Name: $event1Handler, ...}, 
			s: {$style1Name: $style1Value, ...}, 
			c: [$childObject1, ...]}
		);
The t, e, s, and c properties are all optional. The tag name and attribute map are required, although the attribute map can be empty.

## Good
- **CSP**: This libary works within CSP environments as there is no code generation or eval.
- **Injection**: The notation used to generate the HTML makes it difficult for you to accidentally create injection style security bugs
- **Object based**: The input to ObjectToHtml is a JavaScript object in which distinct parts of the HTML markup is represented using distinct portions of JavaScript object notation. Accordingly your IDE knows how to syntax highlight and knows if you have the correct number of closing braces.

## Bad
- **Templating**: This library is an alternative to using innerHTML. This is not an advanced HTML templating libary. If you need to generate a little dynamic HTML safely use this library. If you need to generate an industrial amount HTML use a real HTML templating library.
- **Perf**: Under the covers ObjectToHtml relies on document.createElement et al which is slower than innerHTML. Unless you have a massive amount of HTML the perf difference is likely not going to be an issue for you, but YMMV.

## Why not innerHTML?
Using innerHTML to generate anything other than constant HTML requires correct escaping or encoding of the data you're including or risk security bugs.

## Why not document.createElement, setAttribute, textContent?
These functions used correctly ensure you odn't have to worry about HTML encoding your content but they are very verbose. ObjectToHtml wraps these functions for you into a nicer notation.

## Why are text content, attributes, style, and events separate?
They're distinct to ensure simplicity for the developer, and ensure there's no injection issues caused by the developer being unaware of how data might be interpretted. Accordingly there are no special cases where suddenly a parameter is not interpretted as a string.