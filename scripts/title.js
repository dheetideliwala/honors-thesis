// SVG variables
var usaSvg = d3.select('#states-all-map')
var usaSvgWidth = usaSvg.node().clientWidth * .68;
var usaSvgHeight = usaSvg.node().clientHeight;

var usaMapData;

var usaProjection;

var autoStates = [];
    
function drawMap() {
    Promise.all([d3.json('data/118th_Congressional_Districts.geojson')])
                        .then(data => {
                usaMapData = data[0];

                usaProjection = d3.geoAlbersUsa()    
                                .fitSize([usaSvgWidth, usaSvgHeight], usaMapData);
                
                const geoPath = d3.geoPath().projection(usaProjection);
                
                usaSvg.selectAll('.state')
                        .data(usaMapData.features)
                        .join('path')
                        .attr('class', function(d) {
                            return d.properties.STATEABBR;
                        })
                        .classed('state',true)
                        .attr('id', function(d) {
                            // console.log(d.properties.STATEABBR, d.properties.id)
                            return d.properties.id;
                        })
                        .attr('d',geoPath)
                        .on('mouseover', function(d) {
                            
                            var state = document.getElementsByClassName(d.properties.STATEABBR);

                            for(var i = 0; i < state.length; i++) {
                                state[i].classList.add("highlighted") 
                                state[i].classList.remove("auto")
                            }

                        })
                        .on('mouseout', function(d) {

                            var state = document.getElementsByClassName(d.properties.STATEABBR);
    
                            for(var i = 0; i < state.length; i++) {
                                state[i].classList.remove("highlighted")
                            }

                            // console.log(autoStates)
                            for(var i = 0; i < autoStates.length; i++) {
                                var district = document.getElementById(autoStates[i])
                                // console.log(autoStates[i])
                                district.classList.add("auto")
                            }
                        });
                
                    });

    // var x = 0;
    randomStates = document.getElementsByClassName("state")

    let interval = setInterval(function () {
        // x = x + 3;

        if (randomStates.length == 0) {
            clearInterval(interval)
        }


        for(var i = 0; i < 3; i++) {
            randomStates = document.getElementsByClassName("state")
            // console.log(randomStates)

            let random = Math.floor(Math.random() * randomStates.length);
            // console.log(random)
            autoStates.push(randomStates[random].id)
            // console.log(randomStates[random].id)
            randomStates[random].classList.add("auto")
            randomStates[random].classList.remove("state")
            // console.log(randomStates[random])
            // console.log(randomStates[random].id)
        }
        // console.log(autoStates)

    }, 500);

    // console.log("call")
}

drawMap();

// attempt at responsive map building with window resize
// function reportWindowSize() {
//     usaSvgWidth = window.innerWidth * .69;
//     usaSvgHeight = window.innerHeight;
//     // console.log(usaSvgWidth, usaSvgHeight)
//     usaSvg.selectAll("*").remove();
//     drawMap();
// }

// window.onresize = reportWindowSize;