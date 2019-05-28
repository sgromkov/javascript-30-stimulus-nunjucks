import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import './style.css';
import './sounds/boom.wav';
import './sounds/clap.wav';
import './sounds/hihat.wav';
import './sounds/kick.wav';
import './sounds/openhat.wav';
import './sounds/ride.wav';
import './sounds/snare.wav';
import './sounds/tink.wav';
import './sounds/tom.wav';

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));