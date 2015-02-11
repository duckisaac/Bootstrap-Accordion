# Bootstrap-Accordion
An easy way to generate bootstrap accordions. <a href="http://duckisaac.github.io/Bootstrap-Accordion/">Demo</a>

# How to call it
$('#accordion').accordion(panels, options);

# Options

## panels
   An array containing the necessary configurations for panels/collapses.
   
   Example:
   var panels = [{
        data: {
            title: 'Collapse Title 1',
            body: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.'
        }
    },{
        data: {
            title: 'Collapse Title 2',
            body: '3 wolf moon officia aute, non cupidatat skateboard dolor brunch.'
        }
    },{
        data: {
            title: 'Collapse Title 3',
            body: 'Food truck quinoa nesciunt laborum eiusmod.'
        },
        options: {
            collapse: true
        }
    }];
    
Please check <a href="http://duckisaac.github.io/BootstrapCollapse">Bootstrap Collapse</a> for options that can be used for individual collapse.
    
## options
### maxOpen
  Maximum number of panels be opened in one accordion
### collapseDefaults
  Set default options for collapse, like events. Please check <a href="http://duckisaac.github.io/BootstrapCollapse">Bootstrap Collapse</a> for options.
