# React-Setup_and_first_project
It is based in a tutorial blog for set up.<br>
The application example is a personal app like first React project. Will be a Shopping assistant that let us create a shopping list from and buy the products.

**Status: In develop**

<div align="center">

![React-Setup_and_first_project](courseIcon.png)<br>

</div>

References:<br>
- Set up: [How to set up React, webpack, and Babel 7 from scratch (2019)](https://www.valentinog.com/blog/babel/) for Valentino Gagliardi


## Table of contents


- [React-Setup_and_first_project](#react-setupandfirstproject)
  - [Table of contents](#table-of-contents)
- [1. How to set up React, Webpack and Babel](#1-how-to-set-up-react-webpack-and-babel)
  - [1.1. Setting up the project](#11-setting-up-the-project)
  - [1.2. Setting up Webpack](#12-setting-up-webpack)
  - [1.3. Setting up Babel](#13-setting-up-babel)
  - [1.4 Setting up React](#14-setting-up-react)
- [2. Writing React components](#2-writing-react-components)
- [3. The HTML Webpack plugin](#3-the-html-webpack-plugin)


# 1. How to set up React, Webpack and Babel
## 1.1. Setting up the project
The first step is creat a folder where the code will be stored. With a terminal console execute npm instruction to initialize the project:
``` console
npm init -y
```
## 1.2. Setting up Webpack
Webpack is a npm, It allows us to run in an environment that host VAP. The benefist:
- It bundles modules into one .js file
- Comes with a dev.server
To install Webpack execute the next insturction (--save-dev indicates the dependency will be installe only for the current project)
``` console
npm i webpack webpack-cli --save-dev
```
Inside the package.json, the "scripts" section let define instructions to execute with **npm run** command. I like define the next three commands:
```jsx
  "scripts": {    
    "buildDev": "webpack --mode development",
    "buildProd": "webpack --mode production"
  },
```  
  - **buildDev**: create a folder with the application minimized code in a onlye script (index.js)
  - **buildProd**: create a folder with the application minimized and compressed code in a only script (index.js)


At this point there is no need to define a configuration file for Webpack. Older Webpack versions would automatically look for a configuration file. Since version 4 that is no longer the case.

## 1.3. Setting up Babel
Older browsers don't understand ECMAScript 2015, thus we need some kind of transformation. That transformation is called transpiling.

Babel-loader is the Webpack loader responsible for talking to Babel. Babel on the other hand must be configured to used presets. It is necessary two of them:
- **babel preset env** for compiling modern Javascript donw to ES5
- **babel preset react** for compiling JSX and other stuff dow to Javascript.

To set de dependencies:
```console
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
Next up configure Babel. Create a new file named **.babelrc** inside the project folder with the code:
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
Now is necessary define a minimal Webpack configuration. For every file with a js or jsx extension Webpack pipes the code through babel-loader Create a new file name **webpack.config.js** inside the project folder with the code:
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```

## 1.4 Setting up React
To install React execute the next command:
```console
npm i react react-dom --save-dev
```

# 2. Writing React components
React structured is based in components. Create a folder  to stored them (**src/js/components**).

Create a file Form.js (the first compnent) with the next below.

```jsx
import React, { Component } from "react"; //imports necessary
import ReactDom from "react-dom";

class Form extends Component { //inheritance from Component
  constructor(){ //reserved method
    super();
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const { value } = event.target;
    this.setState(()=>{
      return {
        value
      };
    });
  }

  render(){ //how print the component
    return (
      <form>
        <input type="text" value="this.state.value" onChange={this.handleChange}/>
      </form>
    );
  }
}

export default Form; //export the class
```

Webpack expets the entry point in src/index.js. It is necessary create this file and add the firt component created
```jsx
import Form from "./js/component/Form";
```

With the index.js file created and the first compnent (Form) too, execute the scripts define to run the application and/or create the bundle for production/development.

To execute the scripts use the command **npm run "scriptName"**.

For example if execute buildDev or buildProd you can see a new folder **dist** with the **main.js** file wih all necessary code. With the buildProd the main.js file size is less than with the buildDev script (128kb agains 980kb in my case).

# 3. The HTML Webpack plugin
To display the React form we bust tell Webpack to produce an HTML page. The resulting bundle will be place inside a **< script >** tag.

Webpack needs two aditional components for procession HTML. To add this dependency is necesary isntall it with npm and modify the Webpack configuration file (add another rule and plugin).
```console
npm i html-webpack-plugin html-loader --save-dev
```
```jsx
module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
  };
```

Next up crate an HTML file in **src/index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>How set up React, Webpack and Babel</title>
    </head>
    <body>
        <div id="container"></div>
    </body>
</html>
```
One last thing is tell our React component to hook itself into HTML document.
Inside **Form.js** add the following code at the end fo the file:
```jsx
const wrapper = document.getElementById("container");
wrapper ? ReactDom.render(<Form />, wrapper) : false;
```
If execute **npm run buildProd**you should see the resulting HTML into dist folder. The bundle is automatically injected into the page.