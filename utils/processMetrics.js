async function processMetrics(indicators, result) {
    for (const element of result.metrics) {
        if (indicators.some((indicator) => indicator.hasOwnProperty(element.name))) {
            
          const indicatorObj = indicators.find((indicator) => indicator.hasOwnProperty(element.name));
          
          if (element.name === 'ResourceFetchers') {

                if (indicatorObj[element.name] < element.value) {
                    console.log(indicatorObj[element.name], element.value);
                    return {value:false, answer: `${element.name} not normal`};
                };
            };
            
                if (indicatorObj[element.name] < element.value/1000000) {
                    console.log(indicatorObj[element.name], element.value);
                    return {value:false, answer: `${element.name} not normal`};
            };
        }; 
    };
    
    return {value:true, answer: "all metrics are normal"};
};

module.exports  = processMetrics;