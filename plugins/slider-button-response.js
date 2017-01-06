/**
 * jspsych-slider-button-response
 * Josh de Leeuw documentation: docs.jspsych.org
 *
 * Liam O'Sullivan 
 * plugin modified plugin to use a slider with a Likert-style subjective test
 *
 *
 **/

jsPsych.plugins["slider-button-response"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    // default trial parameters
    trial.button_html = trial.button_html || '<button class="jspsych-btn">%choice%</button>';
    trial.response_ends_trial = (typeof trial.response_ends_trial === 'undefined') ? true : trial.response_ends_trial;
    trial.timing_stim = trial.timing_stim || -1; // if -1, then show indefinitely
    trial.timing_response = trial.timing_response || -1; // if -1, then wait for response forever
    trial.is_html = (typeof trial.is_html === 'undefined') ? false : trial.is_html;
    trial.prompt = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;
    trial.labels = (typeof trial.labels === 'undefined') ? ["Left", "Right"] : trial.labels;
    trial.intervals = trial.intervals || 100;
    trial.show_ticks = (typeof trial.show_ticks === 'undefined') ? false : trial.show_ticks;

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends var
    //early setTimeoutHandlers = [];

     //show prompt if there is one
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }

    // display stimulus
    if (!trial.is_html) {
      display_element.append($('<img>', {
        src: trial.stimulus,
        id: 'jspsych-button-response-stimulus',
        class: 'block-center'
      }));
    } else {
      display_element.append($('<div>', {
        html: trial.stimulus,
        id: 'jspsych-button-response-stimulus',
        class: 'block-center'
      }));
    }

    show_response_slider(display_element, trial);
  } 

  function show_response_slider(display_element, trial) {
  var startTime = (new Date()).getTime();
    // create slider
    display_element.append($('<div>', {
     "id": 'slider',
     "class": 'sim'
    }));

    $("#slider").slider({
      value: Math.ceil(trial.intervals / 2),
      min: 1,
      max: trial.intervals,
      step: 1,
    });

       // show tick marks
    if (trial.show_ticks) {
    for (var j = 1; j < trial.intervals - 1; j++) {
    $('#slider').append('<div class="slidertickmark"></div>');
    }

    $('#slider .slidertickmark').each(function(index) {
      var left = (index + 1) * (100 / (trial.intervals - 1));
      $(this).css({
        'position': 'absolute',
        'left': left + '%',
        'width': '1px',
        'height': '100%',
        'background-color': '#222222'
        });
      });
    }

    // create labels for slider
    display_element.append($('<ul>', {
      "id": "sliderlabels",
      "class": 'sliderlabels',
      "css": {
        "width": "100%",
        "height": "3em",
        "margin": "10px 0px 0px 0px",
        "padding": "0px",
        "display": "block",
        "position": "relative"
      }
    }));

    for (var j = 0; j < trial.labels.length; j++) {
     $("#sliderlabels").append('<li>' + trial.labels[j] + '</li>');
    }

    // position labels to match slider intervals
    var slider_width = $("#slider").width();
    var num_items = trial.labels.length;
    var item_width = slider_width / num_items;
    var spacing_interval = slider_width / (num_items - 1);

    $("#sliderlabels li").each(function(index) {
      $(this).css({
        'display': 'inline-block',
        'width': item_width + 'px',
        'margin': '0px',
        'padding': '0px',
        'text-align': 'center',
        'position': 'absolute',
        'left': (spacing_interval * index) - (item_width / 2)
      });
    });
    
    //create button
    display_element.append($('<button>', {
        'id': 'next',
        'width': '100px',
        'height': '75px',
        'class': 'sim',
        'html': 'Submit',
        class: 'block-center'
    }));
  
    $("#next").click(function() {
        var endTime = (new Date()).getTime();
        var response_time = endTime - startTime;

        // kill any remaining setTimeout handlers
        // for (var i = 0; i < setTimeoutHandlers.length; i++) {
        //   clearTimeout(setTimeoutHandlers[i]);
        // }

        var score = $("#slider").slider("value");
        var trial_data = {
          "slider_score": score,
          // "rt": response_time,
          "stimulus": JSON.stringify(trial.stimulus)
        };
        // goto next trial in block
        display_element.html('');
        jsPsych.finishTrial(trial_data);
      });    
 }; //End of show_response-slider

  return plugin;
})();
