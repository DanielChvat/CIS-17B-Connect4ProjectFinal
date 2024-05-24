<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="styles.css" />
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- React/Bable modules have to be exported and imported inside the <script></script> tags. -->
    <script type="text/babel" data-presets="react" src="components/Board.js">
        export { Board() };
    </script>
    <script type="text/babel" data-presets="react" src="index.js">
        import { Board } from './components/Board.js';
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
