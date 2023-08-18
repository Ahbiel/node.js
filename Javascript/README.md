## Using the DOM API

DOM stands for Document Object Model. It is an object-oriented representation of structured documents like XML and HTML. Setting the **textContent** property of an Element is one way to output text on a web page.

```html
<p id="paragraph"></p>

<script>
    document.getElementById("paragraph").textContent = "Hello, World";
</script>
```

You can also use JavaScript to **create a new HTML element** programmatically. For example, consider an HTML document with the following body:
```html
<body>
    <h1>Adding an element</h1>
</body>

<script>
    var element = document.createElement('p');
    element.textContent = "Hello, World";
    document.body.appendChild(element); //add the newly created element to the DOM
</script>
```

## Properity window

**window.alert(message)**: The alert method displays a visual alert box on screen. The alert method parameter is displayed to the user in plain text:

**window.prompt(message)**: An easy way to get an input from a user is by using the prompt() method.

**window.confirm(message)**: The window.confirm() method displays a modal dialog with an optional message and two buttons, OK and Cancel (is a boolean). Window.confirm() is typically used to ask for user confirmation before doing a dangerous operation like deleting something in a Control Panel
