import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import './style.css';
import './images/image.jpg';

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));