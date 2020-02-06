function plotsVariation(id) {
//Read samples.json
    d3.json("samples.json").then (sample =>{
        console.log(sample)

        var ids = sample.samples[0].otu_ids;
        var sampleVal =  sample.samples[0].sample_values.slice(0,10).reverse();
        var labels =  sample.samples[0].otu_labels.slice(0,10);
        
        // pull 10 otu ids for the plot OTU and reversing it.   
        var OTU_top = ( sample.samples[0].otu_ids.slice(0, 10)).reverse();

        // pull otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        // pull the top 10 labels for the plot
        var labels =  sample.samples[0].otu_labels.slice(0,10);
        
        var origin = {
            x: sampleVal,
            y: OTU_id,
            text: labels,

            marker: {
              color: '#CE471D'},
              type:"bar",
            orientation: "h",
        };
        // create dataset variable
        var dataset = [origin];

        // initiate layouts variable to set plots layout
        var layouts = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            //Add margins
            margin: {
                l: 100, r: 100, t: 100, b: 30
            }
        };

        // initiate bar dataset plot
    Plotly.newPlot("bar", dataset, layouts);
        // create bubble chart
        var originOne = {
            x: sample.samples[0].otu_ids,
            y: sample.samples[0].sample_values,
            mode: "markers",
            //trace the markers
            marker: { 
              size: sample.samples[0].sample_values, color: sample.samples[0].otu_ids
            },
            text:  sample.samples[0].otu_labels

        };

        // make the bubble plot layout
        var layoutsTwo = {
            xaxis:{
              title: "OTU ID"
            },
            //Add height and width dementions
            height: 600,
            width: 1000
        };

        // creating dataSet variable 
        var dataSetOne = [originOne];

    // create bubble plot
    Plotly.newPlot("bubble", dataSetOne, layoutsTwo); 
    
    });
}  


// create the function for id
function variationDemo(id) {
    // read JSON data 
    d3.json("samples.json").then((dataValue)=> {
        // add metadata info to demographic panel
        var metadata = dataValue.metadata;

        console.log(metadata)

       // use id to filter meta data
       var resultData = metadata
            .filter(meta => meta.id.toString() === id)[0];
       // put data in the demoInfo panel
       var demoInfo = d3.select("#sample-metadata");
        
       // empty out demographic information
       demoInfo.html("");

        // append data to the demographic info panel
        Object.entries(resultData).forEach((keyValue) => {   
            demoInfo.append("h5")
            .text(keyValue[0]
            .toUpperCase() + ": " 
            + keyValue[1] + "\n");    
        });
    });
}
// create the function for the change event
function optionChanged(event) {
    plotsVariation(event);
    variationDemo(event);
}

// create and init function for rendering different data values
function init() {
    // view different datasets with the selective dropdown menu
    var dropdown = d3.select("#selDataset");

    // read JSON data 
    d3.json("samples.json").then((datasets)=> {
        console.log(datasets)

        // dropdwown menu for option and value
        datasets.names.forEach(function(labelName) {
            dropdown.append("option").text(labelName).property("value");
        });

        // call function to display the plots and data
        plotsVariation(datasets.names[0]);
        variationDemo(datasets.names[0]);
    });
}

init();
