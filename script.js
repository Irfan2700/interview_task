let renderRoot = document.getElementById('renderbody');

let dataArray = [];

// renderRoot.appendChild();


fetch('https://flipkart-page-api.vercel.app')
    .then((response) => response.json())
    .then(data => {
        dataArray = data;
        console.log(dataArray)
        operation(dataArray)
    })
    .catch((err) => console.log(err));

function operation(array) {

    function widgetCreation(arr,element) {

        // let arr1 = arr;

        function imageCreator(assetObj, ele, grow) {

            console.log(a);

            let imageContainer = document.createElement('a');
            let imagetag = document.createElement('img');
            imagetag.className = 'assetImage';
            imageContainer.className = 'imageContainer';

            imagetag.id = assetObj.id;
            imagetag.src = assetObj.imageUrl;
            // imagetag.style.width = grow;
            
            let currentImageContainer = ele.appendChild(imageContainer);
            let currentImagesection = currentImageContainer.appendChild(imagetag);
            

        }

        function widgetLogic (slot) {
            let widget = document.createElement('div');
                widget.className = 'widget';
                // widget.style.flex = '0 0' + ' ' + slot.grow;

                let currentWidget = element.appendChild(widget);


                if(Array.isArray(slot.assets)){
                    // debugger;
                    slot.assets.forEach((currAssetObj) => {
                        // debugger;

                        imageCreator(currAssetObj, currentWidget, slot.grow)
                        // debugger;
                    })
                }
        }

        if(!Array.isArray(arr)){
            return widgetLogic(arr);
        }
        arr.forEach(currslot => {
            if (slot.slotType === "WIDGET") {
                widgetLogic(currslot);
            }
        })

    }

    // var closure = widgetCreation({[1,2,3]})


    function containerCreation (containerSlot, element) {
        let container = document.createElement('section');
            container.className = 'container';

            let currentContainer = element.appendChild(container);

            if(Array.isArray(containerSlot.children)) {
                containerSlot.children.forEach(subSlot => {
                    if(subSlot.slotType === "WIDGET") {
                        widgetCreation(subSlot, currentContainer);
                    }else if(subSlot.slotType === "CONTAINER"){
                        containerCreation(subSlot, currentContainer);
                    }
                })
            }
    }


    array.forEach((slot) => {
        if (slot.slotType === "CONTAINER") {
            containerCreation(slot, renderRoot)

        } else {

            widgetCreation(slot, renderRoot);
        }
    });


    // console.log(containers)
    // renderRoot.appendChild

    let containerLessWidgets = array.filter((slot) => slot.slotType === "CONTAINER");
}

document.getElementById('renderbody').addEventListener('click',(evt) => {
    if(evt.target.classList.contains('selected')) 
        evt.target.classList.remove('selected');
    else 
        evt.target.classList.add('selected');

    
})