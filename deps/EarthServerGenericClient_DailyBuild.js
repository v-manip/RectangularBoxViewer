/**
 * @namespace Namespace for the Earth Server Generic Client
 * @version 0.7 alpha 25.11.1013
 */
var EarthServerGenericClient =  {};

/**
 * @ignore Just Inheritance Helper
 */
Function.prototype.inheritsFrom = function( parentClassOrObject )
{
    if ( parentClassOrObject.constructor == Function )
    {
        //Normal Inheritance
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else
    {
        //Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};

/**
 * @ignore remove function for arrays - By John Resig
 */
EarthServerGenericClient.arrayRemove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

/**
 * @ignore Helper function to replace all occurrences in strings
 */
EarthServerGenericClient.replaceAllFindsInString = function (str,find,replace)
{
    return str.split(find).join(replace);
};

/**
 * @ignore Helper function to check if an input is numeric.
 * @param input
 * @returns {boolean}
 * @constructor
 */
EarthServerGenericClient.IsNumeric = function(input)
{
    return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, "").length > 0;
};

/**
 * This function checks if this code is running is on a mobile platform.
 * @return true if mobile platform, false if not
 */
EarthServerGenericClient.isMobilePlatform = function ()
{
    var mobilePlatform = (function(a)
    {
        if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge|maemo|midp|mmp|opera m(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows(ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|awa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r|s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(|\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg(g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-||o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g|nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
        {return true} else {return false}
    })(navigator.userAgent||window.opera);

    return mobilePlatform;
};

/**
 * @ignore Helper function to delete all children of a dom element.
 */
EarthServerGenericClient.deleteAllChildsFromDomElement = function(domElementID)
{
    var domElement = document.getElementById(domElementID);

    if(domElement)
    {
        while(domElement.firstChild)
        {
            domElement.removeChild(domElement.firstChild);
        }
    }
};

/**
 * @class Creates a light to enlighten the scene.
 * @param domElement - Dom element to append the light to.
 * @param index - Index of the light.
 * @param position - Position of the light (local coordinates)
 * @param radius - Radius of the light.
 * @param color - Color if the Light
 * @constructor
 */
EarthServerGenericClient.Light = function(domElement,index,position,radius,color)
{
    var ambientIntensity = "0.5";
    var intensity        = "0.8";
    var location         = "0 1000 0";

    if(position === undefined){  location = position;    }
    if(radius === undefined ) {  radius = "8000";    }
    if(color === undefined)   {  color = "1 1 1"; }

    if(domElement !== undefined && domElement !== null)
    {
        var light = document.createElement("PointLight");
        light.setAttribute("id", "EarthServerGenericClient_Light_"+index);
        light.setAttribute("ambientIntensity",ambientIntensity);
        light.setAttribute("color",color);
        light.setAttribute("intensity",intensity);
        light.setAttribute("radius",radius);
        light.setAttribute("location",location);

        domElement.appendChild(light);
        light = null;
    }
};

/**
 * @class SceneManager is the main class of the unified client.
 * All scene models are registered in this class with the add() function.
 * The createScene() function creates a x3dom scene with all scene models.
 * The createUI() function creates the UI.
 */
EarthServerGenericClient.SceneManager = function()
{
    var models = [];               // Array of scene models
    var modelLoadingProgress = []; // Array to store the models loading progress
    var totalLoadingProgress = 0;  // Value for the loading progress bar (all model loading combined)
    var baseElevation = [];        // Every Model has it's base elevation on the Y-Axis. Needed to change and restore the elevation.
    var baseWidth = [];            // Every Model has it's base width on the X-Axis. Needed to change and restore the width.
    var baseLength = [];            // Every Model has it's base length on the Z-Axis. Needed to change and restore the length.
    var progressCallback = undefined;// Callback function for the progress update.
    var annotationLayers = [];      // Array of AnnotationsLayer to display annotations in the cube
    var viewpoints = [];            // Array of user created viewpoints
    var cameraDefs = [];            // Name and ID of the specified cameras. Format: "NAME:ID"
    var lights = [];                // Array of (Point)lights
    var lightInScene = false;       // Flag if a light should be added to the scene
    var nextFrameCallback = [];     // Array of callbacks that should be done in any next frame.
    var lastFrameInsert = Number.MAX_VALUE; // Frame counter since the last insertion of data into the dom
    var framesBetweenDomInsertion = 1; // Number of frames between two insertions into the dom.
    var oculusRift = false;         // Flag if the scene is rendered for the oculus rift.
    var InstantIOPort = undefined;  // Port to Instant IO to connect the oculus rift.
    var drawCube = true;            // Flag if the cube should be drawn.
    var defaultSpecularColor = "0.25,0.25,0.25"; // default specular color for materials
    var defaultDiffuseColor = "1 1 1"; // default diffuse color for materials
    var keyMapping = {};            // Stores the keys for certain events
    var globalElevationValue = 10;  // Stores the last used global elevation value

    // Default cube sizes
    var cubeSizeX = 1000;
    var cubeSizeY = 1000;
    var cubeSizeZ = 1000;

    // Background
    var Background_groundAngle = "0.9 1.5 1.57";
    var Background_groundColor = "0.8 0.8 0.95 0.4 0.5 0.85 0.3 0.5 0.85 0.31 0.52 0.85";
    var Background_skyAngle    = "0.9 1.5 1.57";
    var Background_skyColor    = "0.8 0.8 0.95 0.4 0.5 0.85 0.3 0.5 0.85 0.31 0.52 0.85";

    /**
     * The maximum resolution in one axis of one scene model.
     * @default 2000
     * @type {number}
     */
    var maxResolution = 2000;

    /**
     * Enables/Disables the logging of Server requests, building of terrain etc.
     * @default false
     * @type {boolean}
     */
    var timeLog= false;

    /**
     * This variable contains the AxisLabel object.
     * This object manages the labels and its appearances on each axis.
     * @default null
     * @type {Object}
     */
    var axisLabels = null;

    /**
     * Initiates the default key mapping.
     */
    this.initKeyMapping = function()
    {
        // Go to viewpoint x
        keyMapping.vp1 = 49; // key: 1
        keyMapping.vp2 = 50; // key: 2
        keyMapping.vp3 = 51; // key: 3
        keyMapping.vp3 = 51; // key: 3
        keyMapping.vp4 = 52; // key: 4
        keyMapping.vp5 = 53; // key: 5
        keyMapping.vp6 = 54; // key: 6

        // modify light
        keyMapping.lightDown = 57; // key: 9
        keyMapping.lightUp   = 48; // key: 0

        // global elevation
        keyMapping.globalElevUp   = 105; // key: i
        keyMapping.globalElevDown = 107; // key: k

        // prompts the current viewpoint
        keyMapping.cvp = 66; // key: B
    };

    /**
     * Sets a custom short cut key. Events can be:
     * "ViewPointX": While x is a number between 1-6. Goes to viewpoint x.
     * "ShowViewPoint": Prompts the current viewpoint.
     * "LightDown"/"LightUp": changes the intensity of the light source.
     * "ElevationDown"/ElevationUp": changes the global elevation.
     * @param event - The event.
     * @param key - The key as char.
     */
    this.setShortCut = function(event,key)
    {
        // get the char value
        var value = String(key).charCodeAt(0);

        if(event.toLowerCase() === "viewpoint1") keyMapping.vp1 = value;
        if(event.toLowerCase() === "viewpoint2") keyMapping.vp2 = value;
        if(event.toLowerCase() === "viewpoint3") keyMapping.vp3 = value;
        if(event.toLowerCase() === "viewpoint4") keyMapping.vp4 = value;
        if(event.toLowerCase() === "viewpoint5") keyMapping.vp5 = value;
        if(event.toLowerCase() === "viewpoint6") keyMapping.vp6 = value;

        if(event.toLowerCase() === "showviewpoint") keyMapping.cvp = value;
        if(event.toLowerCase() === "elevationdown") keyMapping.globalElevDown = value;
        if(event.toLowerCase() === "elevationup")   keyMapping.globalElevUp = value;
        if(event.toLowerCase() === "lightup")       keyMapping.lightUp = value;
        if(event.toLowerCase() === "lightdwon")     keyMapping.lightDown = value;
    };

    /**
     * Handles the pressed key.
     */
    this.handleKeys = function (e)
    {
        var key = e.charCode;

        switch(key)
        {
            case keyMapping.vp1: this.setViewByCameraDefIndex(0);  break;
            case keyMapping.vp2: this.setViewByCameraDefIndex(1);  break;
            case keyMapping.vp3: this.setViewByCameraDefIndex(2);  break;
            case keyMapping.vp4: this.setViewByCameraDefIndex(3);  break;
            case keyMapping.vp5: this.setViewByCameraDefIndex(4);  break;
            case keyMapping.vp6: this.setViewByCameraDefIndex(5);  break;

            case keyMapping.cvp:        this.showCurrentViewPoint(); break;
            case keyMapping.lightUp:    this.increaseLightIntensity(0); break;
            case keyMapping.lightDown:  this.decreaseLightIntensity(0); break;
            case keyMapping.globalElevUp: this.increaseGlobalElevation(); break;
            case keyMapping.globalElevDown: this.decreaseGlobalElevation(); break;
            //default: console.log("No key defined for char: " + key);
        }
    };

    /**
     * Shows an alert with the current viewpoint.
     */
    this.showCurrentViewPoint = function()
    {
        var e = document.getElementById('x3d');
        var mat_view = e.runtime.viewMatrix().inverse();

        var rotation = new x3dom.fields.Quaternion(0, 0, 1, 0);
        rotation.setValue(mat_view);
        var rot = rotation.toAxisAngle();
        var translation = mat_view.e3();

        var text = '"' + translation.x.toFixed(5) + ' '
            + translation.y.toFixed(5) + ' ' + translation.z.toFixed(5) + '", ' +
            '"' + rot[0].x.toFixed(5) + ' ' + rot[0].y.toFixed(5) + ' '
            + rot[0].z.toFixed(5) + ' ' + rot[1].toFixed(5)+'"';

        window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
    };

    /**
     * Sets if the x3dom oculus rift mode shall be enabled.
     * @param value - True/False
     * @param port - Instant IO Port
     */
    this.setOculusRift = function( value, port )
    {
        oculusRift = value;
        InstantIOPort = port;
    };

    /**
     * Adds custom viewpoints to the scene and UI.
     * Viewpoints can be put out to the debug console by pressing 'd' and 'v'.
     * @param name - Name of the Viewpoint for the UI.
     * @param Position - Position of the viewpoint.
     * @param Orientation - Orientation of the viewpoint.
     */
    this.addCustomViewPoint = function(name,Position,Orientation)
    {
        // check if viewpoint with this name already exist
        for(var i=0; i<viewpoints.length;i++)
        {
            if( viewpoints[i].name === name)
            {
                console.log("EarthServerClient::MainScene::addCustomViewPoint: Viewpoint with name" + name + " already exist.");
                return;
            }
        }

        var vp = {};
        vp.name = name;
        vp.position = Position;
        vp.orientation = Orientation;

        viewpoints.push( vp );
    };

    /**
     * Resets the X3D Scene. All global setting of the scene keeps the the same.
     */
    this.resetScene = function()
    {
        // TODO: TEST function with different setups
        // clear all models and terrains
        for(var i=0; i<models.length; i++)
        {
            if (models[i].terrain) {
                models[i].terrain.clearMaterials();
                models[i].terrain.clearDefinedAppearances();
                models[i].terrain = null;
            }
        }

        // reset vars
        models = [];
        modelLoadingProgress = [];
        totalLoadingProgress = 0;
        baseElevation = [];
        baseWidth = [];
        baseLength = [];
        progressCallback = undefined;
        annotationLayers = [];
        cameraDefs = [];
        lights = [];
        nextFrameCallback = [];
        lastFrameInsert = Number.MAX_VALUE;

        // reset x3d scene
        EarthServerGenericClient.deleteAllChildsFromDomElement( this.x3dID );

        // destroy UI
        EarthServerGenericClient.deleteAllChildsFromDomElement( this.UIID );
        EarthServerGenericClient.destroyBasicUI( this.UIID );

        // add root and scene group nodes
        var root = document.createElement("group");
        root.setAttribute("id","root");
        var scene = document.createElement("group");
        scene.setAttribute("id",this.sceneID);

        root.appendChild(scene);
        var x3d = document.getElementById( this.x3dID);
        if(x3d)
            x3d.appendChild(root);
    };

    /**
     * Sets the default specular color for all modules.
     * The color set directly for a module overwrite this color.
     * @param color - Default Color in rgb e.g.: 0.25 0.25 0.25
     */
    this.setDefaultSpecularColor = function(color)
    {
        defaultSpecularColor = color;
    };


    /**
     * Return the default specular color.
     * @returns {string} - Default specular color in rgb.
     */
    this.getDefaultSpecularColor = function()
    {
        return defaultSpecularColor;
    };

    /**
     * Sets the default specular color for all modules.
     * The color set directly for a module overwrite this color.
     * @param color - Default Color in rgb e.g.: 0.25 0.25 0.25
     */
    this.setDefaultDiffuseColor = function(color)
    {
        defaultDiffuseColor = color;
    };

    /**
     * Return the default diffuse color.
     * @returns {string} - Default diffuse color in rgb.
     */
    this.getDefaultDiffuseColor = function()
    {
        return defaultDiffuseColor;
    };

    /**
     * Return the size of the cube in the x axis
     * @returns {number}
     */
    this.getCubeSizeX = function()
    {   return cubeSizeX;   };

    /**
     * Return the size of the cube in the y axis
     * @returns {number}
     */
    this.getCubeSizeY = function()
    {   return cubeSizeY;   };

    /**
     * Return the size of the cube in the z axis
     * @returns {number}
     */
    this.getCubeSizeZ = function()
    {   return cubeSizeZ;   };

    /**
     * Sets if a light is inserted into the scene.
     * @param value - Boolean value.
     */
    this.addLightToScene = function(value)
    {
        lightInScene = value;
    };

    /**
     * Sets if the cube should be drawn.
     * @param value - Boolean value.
     */
    this.setDrawCube = function(value)
    {
        drawCube = value;
    };

    /**
     * Returns the number of scene lights.
     * @returns {Number}
     */
    this.getLightCount = function()
    {
        return lights.length;
    };

    /**
     * This function sets the background of the X3Dom render window. The Background is basically a sphere
     * where the user can sets colors and defines angles to which the colors float.
     * Colors are RGB with floats [0-1] separated by whitespaces. ( "0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9" )
     * Angles are in [0-1.57] (1.57 is PI/2) and also separated by whitespaces. ( "0.9 1.57" )
     * You need exactly one more color than angles like the examples.
     * @param skyColors - Colors of the sky from top to horizon. Three RGB values for each color.
     * @param skyAngles - Angles to where the sky colors are drawn. 1.57 for full sky.
     * @param groundColors - Colors of the ground from bottom to horizon. Three RGB values for each color.
     * @param groundAngles - Angles to where the ground colors are drawn. 1.57 for full ground.
     */
    this.setBackground = function(skyColors,skyAngles,groundColors,groundAngles)
    {
        Background_groundAngle = groundAngles;
        Background_groundColor = groundColors;
        Background_skyAngle    = skyAngles;
        Background_skyColor    = skyColors;
    };

    /**
     * Returns the number of registered scene models.
     * @returns {Number}
     */
    this.getModelCount = function()
    {
        return models.length;
    };

    /**
     * Returns the name of the scene model with the given index.
     * @param modelIndex - Index of the model.
     * @returns {String}
     */
    this.getModelName = function(modelIndex)
    {
        if(modelIndex < models.length)
        {   return models[modelIndex].name; }
        else
        {   return "No model with ID " + modelIndex;    }
    };

    /**
     * Returns the X offset of the model with the given index.
     * @param modelIndex - Index of the model.
     * @returns {Number}
     */
    this.getModelOffsetX= function(modelIndex)
    {
        if(modelIndex < models.length)
        {   return models[modelIndex].xOffset; }
        else
        {
            console.log("MainScene::getModelOffsetX: No model with ID " + modelIndex);
            return 0;
        }
    };

    /**
     * Returns the Y offset of the model with the given index.
     * @param modelIndex - Index of the model.
     * @returns {Number}
     */
    this.getModelOffsetY= function(modelIndex)
    {
        if(modelIndex < models.length)
        {   return models[modelIndex].yOffset; }
        else
        {
            console.log("MainScene::getModelOffsetY: No model with ID " + modelIndex);
            return 0;
        }
    };

    /**
     * Returns the Z offset of the model with the given index.
     * @param modelIndex - Index of the model.
     * @returns {Number}
     */
    this.getModelOffsetZ= function(modelIndex)
    {
        if(modelIndex < models.length)
        {   return models[modelIndex].zOffset; }
        else
        {
            console.log("MainScene::getModelOffsetZ: No model with ID " + modelIndex);
            return 0;
        }
    };

    /**
     * Returns the transparency of the model with the given index.
     * @param modelIndex - Index of the model.
     * @returns {Number}
     */
    this.getModelTransparency = function(modelIndex)
    {
        if(modelIndex < models.length)
        {   return models[modelIndex].transparency; }
        else
        {
            console.log("MainScene::getModelTransparency: No model with ID " + modelIndex);
            return 0;
        }
    };

    /**
     * Let the scene model set it's specific UI element in the given domElement.
     * @param modelIndex - Index of the model.
     * @param domElement - domElement to put the UI element into.
     */
    this.setSpecificElement = function(modelIndex,domElement)
    {
        if(modelIndex < models.length)
        {   models[modelIndex].setSpecificElement(domElement); }
        else
        {
            console.log("MainScene::SetSpecificElement: No model with ID " + modelIndex);
        }
    };

    /**
     * @default 2000 / 200 on a mobile platform
     * @type {Number}
     */
    if( EarthServerGenericClient.isMobilePlatform())  //and for mobile Clients
        maxResolution = 200;

    /**
     * Enables or disables the logging.
     * @param value - Boolean
     */
    this.setTimeLog = function(value)
    {   timeLog = value; };

    /**
     * Starts the timer for a logging event with the given name.
     * @param eventName
     */
    this.timeLogStart = function(eventName)
    {
        if( timeLog)
        {   console.time(eventName); }
    };

    /**
     * Ends the timer for a logging event with the given name and prints the result.
     * @param eventName
     */
    this.timeLogEnd = function(eventName)
    {
        if( timeLog)
        {   console.timeEnd(eventName); }
    };

    /**
     * Returns the index of a scene model with a given name.
     * @param modelName - Name of the model.
     * @returns {number} - Index of the model or -1 if no model with the given name was found.
     */
    this.getModelIndex = function(modelName)
    {
        for(var i=0;i<models.length;i++)
        {
            if( models[i].name === modelName)
            {
                return i;
            }
        }

        return -1;
    };

    /**
     * This function returns the position within the cube for a specific point, if the cube represents the given area.
     * Returned object has "x","y","z" members and "valid" as a flag whether the point is within the area or not.
     * IF valid is false, "x","y" and "z" are not set and undefined.
     * @param modelIndex - Index of the model the point is used for. Used to determine the height on the y-axis.
     * @param latitude - Latitude coordinate of the point.
     * @param longitude - Longitude coordinate of the point.
     * @param area - Area of the cube.
     * @returns {{}} - Coordinates in scene space of the point.
     */
    this.getCubePositionForPoint = function(modelIndex,latitude,longitude,area)
    {
        var position = {};
        position.valid = false;

        var xPercent = (latitude  - area.minx) / (area.maxx - area.minx);
        var zPercent = (longitude - area.miny) / (area.maxy - area.miny);

        // Check bounds
        if( xPercent <0 || xPercent > 1 || zPercent <0 || zPercent >1)
        {   console.log("EarthServerGenericClient::SceneManager::getCubePositionForPoint: Point is not in the given area"); }
        else
        {
            position.x = (-cubeSizeX/2.0) + xPercent*cubeSizeX;
            position.y = (-cubeSizeY/2.0) + this.getModelOffsetY(modelIndex) * cubeSizeY;
            position.z = (-cubeSizeZ/2.0) + zPercent*cubeSizeZ;
            position.valid = true;
        }

        return position;
    };

    /**
     * Determines if an annotation layer will be drawn.
     * @param layerName - Name of the annotation layer.
     * @param drawValue - boolean value.
     */
    this.drawAnnotationLayer = function(layerName,drawValue)
    {
        var index = this.getAnnotationLayerIndex(layerName);
        if( index < annotationLayers.length )
        {   annotationLayers[index].renderLayer(drawValue); }
        else
        {   console.log("MainScene::drawAnnotationLayer: No Layer with name " + layerName);  }
    };

    /**
     * Returns the annotation texts of a given annotation layer as an array of strings.
     * @param layerName - Name of the Annotation Layer.
     * @returns {*} - Array of Annotations as strings.
     */
    this.getAnnotationLayerTexts = function(layerName)
    {
        var index = this.getAnnotationLayerIndex(layerName);
        if( index < annotationLayers.length )
        {   return annotationLayers[index].getAnnotationTexts(); }
        else
        {
            var val = [];
            val.push("MainScene::getAnnotationLayerTexts: No Layer with name " + layerName);
            return val;
        }
    };

    /**
     * Returns the number of registered AnnotationLayers.
     * @returns {Number}
     */
    this.getAnnotationLayerCount = function()
    {
        return annotationLayers.length;
    };

    /**
     * Returns the name of the AnnotationLayer with the given index.
     * @param layerIndex - Index of the AnnotationLayer.
     * @returns {*} - Either the Name of the AnnotationLayer or "No Name"
     */
    this.getAnnotationLayerName = function(layerIndex)
    {
        if( layerIndex < annotationLayers.length)
        {   return annotationLayers[layerIndex].name; }
        else
        {
            console.log("MainScene::getAnnotationLayerName: No Layer with ID " + layerIndex);
            return "No Name";
        }
    };

    /**
     * Returns the index of an existing AnnotationLayer in the array or -1 if no layer with the given name was found.
     * @param AnnotationLayerName - Name of the Layer
     * @returns {number} - Either index in the array or -1 if not found
     */
    this.getAnnotationLayerIndex = function(AnnotationLayerName)
    {
        for(var i=0;i<annotationLayers.length;i++)
        {
            if( annotationLayers[i].name === AnnotationLayerName)
            {
                return i;
            }
        }

        return -1;
    };

    /**
     * Adds an AnnotationsLayer to the scene.
     * @param layerName - Name of the Layer. You need the name of a layer to add annotations to it.
     * @param modelName - Name of the scene model to bind the layer to. Can be empty if no binding is intended.
     * @param fontSize - Font size of all annotations added to this layer.
     * @param fontColor - Color of all annotations added to this layer.
     * @param fontHover - The annotation text hovers above the annotation marker by this value.
     * @param markerSize - The size if the annotation marker
     * @param markerColor - Color of the annotation marker
     */
    this.addAnnotationsLayer = function(layerName,modelName,fontSize,fontColor,fontHover,markerSize,markerColor)
    {
        var root = document.getElementById("AnnotationsGroup");
        if( root)
        {
            if( this.getAnnotationLayerIndex(layerName) < 0)
            {
                var layer = new EarthServerGenericClient.AnnotationLayer(layerName,root,fontSize,fontColor,fontHover,markerSize,markerColor);
                annotationLayers.push(layer);
                var modelIndex = this.getModelIndex(modelName);
                if( modelIndex >= 0)
                {
                    //layer.setBoundModuleIndex(modelIndex);
                    models[modelIndex].addBinding(layer);
                }
            }
            else
            {   console.log("AnnotationLayer with this name already created.");   }
        }
        else
        {   console.log("Please add Layers after creating the scene.");   }
    };

    /**
     * Adds an annotation to an existing annotation layer.
     * @param AnnotationLayerName - Name of the annotation layer to add the annotation to.
     * @param xPos - Position on the x-axis of the annotation.
     * @param yPos - Position on the y-axis of the annotation.
     * @param zPos - Position on the z-axis of the annotation.
     * @param Text - Text of the annotation.
     */
    this.addAnnotation = function(AnnotationLayerName,xPos,yPos,zPos,Text)
    {
        var index = this.getAnnotationLayerIndex(AnnotationLayerName);
        if( index >= 0)
        {
            annotationLayers[index].addAnnotation(xPos,yPos,zPos,Text);
        }
        else
        {
           console.log("Could not found a AnnotationLayer with name: " + AnnotationLayerName);
        }
    };

    /**
     * Adds an annotation to an existing annotation layer.
     * The position is given in latitude/longitude and has to be in the bounding box of
     * the model the annotation layer is bound to. The annotation is automatically positioned
     * above the model as soon as it's loaded.
     * @param AnnotationLayerName - Name of the annotation layer to add the annotation to.
     * @param latitude - Position in latitude of the annotation.
     * @param longitude - Position in longitude of the annotation.
     * @param Text - Text of the annotation.
     */
    this.addAnnotationAtPosition = function(AnnotationLayerName,latitude,longitude,Text)
    {
        var layerIndex = this.getAnnotationLayerIndex(AnnotationLayerName);
        if( layerIndex >= 0)
        {
            // Check if layer is bound to a model
            var modelIndex = annotationLayers[layerIndex].getBoundModuleIndex();
            if( modelIndex >= 0)// is bound
            {
                // Get model's local area and calc the position in the fishtank
                var area = models[modelIndex].getAreaOfInterest();
                var xPercent = (latitude  - area.minx) / (area.maxx - area.minx);
                var zPercent = (longitude - area.miny) / (area.maxy - area.miny);

                // Check bounds
                if( xPercent <0 || xPercent > 1 || zPercent <0 || zPercent >1)
                {   console.log("Annotation " + Text + " is not in the module's " + models[modelIndex].getName() + " boundaries."); }
                else
                {
                    var xPos = (-cubeSizeX/2.0) + xPercent*cubeSizeX;
                    // We can't tell the real y position unless the model is fully loaded
                    var yPos = (-cubeSizeY/2.0) + this.getModelOffsetY(modelIndex) * cubeSizeY;
                    var zPos = (-cubeSizeZ/2.0) + zPercent*cubeSizeZ;

                    annotationLayers[layerIndex].addAnnotation(xPos,yPos,zPos,Text);
                }
            }
            else// unbound: can't get lat/long positions so can't insert this annotation.
            {
                console.log("AnnotationLayer with name: "+ AnnotationLayerName + " is not bound to a model.");
                console.log("Can't insert annotation " + Text + " at latitude/longitude position.");
            }
        }
        else
        {
            console.log("Could not found a AnnotationLayer with name: " + AnnotationLayerName);
        }
    };

    /**
     * Sets the callback function for the progress update. The progress function gives a parameter between 0-100.
     * You can set callback = null for no progress update at all. If no callback is given at all the progress is
     * printed to the console.
     * @param callback
     */
    this.setProgressCallback=function(callback)
    {
        progressCallback = callback;
    };

    /**
     * All Modules and Terrain shall report their loading progress.
     * Modules when they receive data and terrains if they are done building the terrain.
     * Every time this function is called 1 is added to the total progress. It is assumed that for every
     * request a terrain is build thus 100% = model.requests*2
     * If a callback is registered the function is called, otherwise the progress is printed to the console or ignored.
     * @param modelIndex - Index of the model.
     */
    this.reportProgress = function(modelIndex)
    {
        //If null no progress update is wished
        if( progressCallback !== null)
        {
            modelLoadingProgress[modelIndex] += 1;

            //Reset total loading progress to 0 and calc it with the new value
            totalLoadingProgress = 0;
            for(var i=0; i<modelLoadingProgress.length; i++)
            {
                var tmp = modelLoadingProgress[i] / ( models[i].requests *2 );
                if( tmp > 1.0) tmp = 1;
                totalLoadingProgress += tmp;
            }
            totalLoadingProgress = (totalLoadingProgress / modelLoadingProgress.length)*100;

            //Callback function or console?
            if( progressCallback !== undefined)
            {   progressCallback(totalLoadingProgress);    }
            else
            {   console.log(totalLoadingProgress); }
        }
    };

    /**
     * Returns the maximum resolution per dimension of a scene model.
     * This number depends on power templates (e.g. mobile device).
     * @return {Number}
     */
    this.getMaxResolution = function()
    {   return maxResolution;   };

    /**
     * Adds any scene model to the scene.
     * @param model - Any type of scene model.
     */
    this.addModel = function( model )
    {
        //Model ID is the current length of the models array. That means to IDs start at 0 and increase by 1.
        model.index = models.length;
        //Store model in the array
        models.push(model);
        //Initialize it's loading progress to 0
        modelLoadingProgress[model.index] = 0;
    };

    /**
     * Sets the view of the X3Dom window to the predefined camera.
     * @param camID - ID of the Camera dom object.
     */
    this.setView =function(camID)
    {
        var cam = document.getElementById(camID);
        if(cam)
        {
            if( oculusRift ) // there is always one viewpoint in oculus mode, change it
            {
                var oculusVP = document.getElementById("EarthServerClient_VR_vpp");
                var pos = cam.getAttribute("position");
                oculusVP.setAttribute("position",pos);
            }
            else
            {
                //If the user changes the camera, then moves around the camera has to be set to false to be able to bin again
                cam.setAttribute('set_bind','false');
                cam.setAttribute('set_bind','true');
            }
        }
        else
            console.log("EarthServerGenericClient::SceneManager::SetView can't find Camera with ID ", camID);
    };

    /**
     * Sets the view of the X3Dom window to the predefined camera.
     * @param cameraDefIndex - Index of the camera as stored in cameraDef.
     */
    this.setViewByCameraDefIndex =function(cameraDefIndex)
    {
        if(cameraDefIndex >= cameraDefs.length)
        {   console.log("EarthServerGenericClient::SceneManager::SetViewByCameraDefIndex has no camera with index ", cameraDefIndex);   }
        else
        {   var cameraDef = cameraDefs[ cameraDefIndex];    }

        var camName = cameraDef.split(":");
        if(camName.length <2 )
        {   console.log("EarthServerGenericClient::SceneManager::SetViewByCameraDefIndex can't find Camera with DEF ", cameraDef);   }
        else
        {   var camID = camName[1];}

        this.setView(camID);
    };


    /**
     * Returns the number of defined cameras
     * @returns {Number}
     */
    this.getCameraDefCount = function()
    {
        return cameraDefs.length;
    };

    /**
     * Returns the definition of the camera with the given index.
     * Format: "CameraName:CameraID"
     * CameraName is for the UI (show on a button or label)
     * CameraID is the ID of the dom element
     * @param cameraIndex - Index of the camera.
     * @returns {String}
     */
    this.getCameraDef = function(cameraIndex)
    {
        if(cameraIndex < cameraDefs.length)
        {   return cameraDefs[cameraIndex]; }
        else
        {   return "Camera:NotDefined"}
    };

    /**
     * Creates the whole X3DOM Scene in the fishtank/cube with all added scene models.
     * The Sizes of the cube are assumed as aspect ratios with values between 0 and 1.
     * Example createScene("x3dom_div",1.0, 0.3, 0.5 ) Cube has 30% height and 50 depth compared to the width.
     * @param x3dID - ID of the x3d scene dom element.
     * @param sceneID - ID of the x3dom root element.
     * @param SizeX - width of the cube.
     * @param SizeY - height of the cube.
     * @param SizeZ - depth of the cube.
     */
    this.createScene = function(x3dID,sceneID, SizeX, SizeY, SizeZ )
    {
        if( SizeX <= 0 || SizeX > 1.0) SizeX = 1.0;
        if( SizeY <= 0 || SizeY > 1.0) SizeY = 1.0;
        if( SizeZ <= 0 || SizeZ > 1.0) SizeZ = 1.0;

        cubeSizeX = (parseFloat(SizeX) * 1000);
        cubeSizeY = (parseFloat(SizeY) * 1000);
        cubeSizeZ = (parseFloat(SizeZ) * 1000);

        var x3d = document.getElementById(x3dID);
        var scene = document.getElementById(sceneID);
        if( !scene || !x3d)
        {
            alert("No X3D Scene found with id " + sceneID);
            return;
        }
        else
        {
            this.x3dID = x3dID;
            this.sceneID = sceneID;
        }

        // Navigation <navigationInfo id="navi" type='"TURNTABLE" "ANY"' typeParams="-0.4, 60, 0.5, 1.55"></navigationInfo>
        var navigation = document.createElement("navigationInfo");
        navigation.setAttribute("type",'"TURNTABLE" "ANY"');
        navigation.setAttribute("typeParams","-0.4, 60, 0.5, 2.55");
        scene.appendChild(navigation);

        // Light
        if( lightInScene)
        {
            var lightTransform = document.createElement("transform");
            lightTransform.setAttribute("id","EarthServerGenericClient_lightTransform0");
            lightTransform.setAttribute("translation","0 0 0");
            lights.push(new EarthServerGenericClient.Light(lightTransform,0, "0 0 0"));
            x3d.appendChild(lightTransform);
        }

        // Background
        if( !oculusRift ) // in oculus mode the background is the rendertextures and declared in this.appendVRShader()
        {
            var background = document.createElement("Background");
            background.setAttribute("groundAngle",Background_groundAngle);
            background.setAttribute("groundColor",Background_groundColor);
            background.setAttribute("skyAngle",Background_skyAngle);
            background.setAttribute("skyColor",Background_skyColor);
            x3d.appendChild(background);

            background = null;
        }

        // Cameras
       // if no custom viewpoints are set create three default ones
       if( viewpoints.length ===0 )
       {
           var cam1 = document.createElement('Viewpoint');
           cam1.setAttribute("id","EarthServerGenericClient_Cam_Front");
           cam1.setAttribute("position", "0 0 " + cubeSizeZ*2);
           cam1.setAttribute("description","EarthServerGenericClient_Cam_Front");
           cameraDefs.push("Front:EarthServerGenericClient_Cam_Front");

           var cam2 = document.createElement('Viewpoint');
           cam2.setAttribute("id","EarthServerGenericClient_Cam_Top");
           cam2.setAttribute("position", "0 " + cubeSizeY*2.5 + " 0");
           cam2.setAttribute("orientation", "1.0 0.0 0.0 -1.55");
           cam2.setAttribute("description","EarthServerGenericClient_Cam_Top");
           cameraDefs.push("Top:EarthServerGenericClient_Cam_Top");

           var cam3 = document.createElement('Viewpoint');
           cam3.setAttribute("id","EarthServerGenericClient_Cam_Side");
           cam3.setAttribute("position", "" + -cubeSizeX*2+ " 0 0");
           cam3.setAttribute("orientation", "0 1 0 -1.55");
           cam3.setAttribute("description","EarthServerGenericClient_Cam_Side");
           cameraDefs.push("Side:EarthServerGenericClient_Cam_Side");

           x3d.appendChild(cam1);
           x3d.appendChild(cam2);
           x3d.appendChild(cam3);

           cam1 = null;
           cam2 = null;
           cam3 = null;
       }

       // insert custom viewpoints
       for(var o=0;o<viewpoints.length;o++)
       {
           var customCam = document.createElement('Viewpoint');
           customCam.setAttribute("id","EarthServerGenericClient_Cam_"+viewpoints[o].name);
           customCam.setAttribute("description","EarthServerGenericClient_Cam_"+viewpoints[o].name);
           customCam.setAttribute("position", viewpoints[o].position);
           // check if orientation is set, else use default
           if( viewpoints[o].orientation !== undefined && viewpoints[o].orientation !== null )
           {   customCam.setAttribute("orientation",viewpoints[o].orientation );   }

           cameraDefs.push(""+viewpoints[o].name+":EarthServerGenericClient_Cam_"+viewpoints[o].name);

           x3d.appendChild(customCam);
           customCam = null;
       }


        // Cube
        if( drawCube)
        {
            var shape = document.createElement('Shape');
            var appearance = document.createElement('Appearance');
            //appearance.setAttribute("sorttype","opaque");
            var material = document.createElement('Material');
            material.setAttribute("emissiveColor","1 1 0");

            var lineset = document.createElement('IndexedLineSet');
            lineset.setAttribute("colorPerVertex", "false");
            lineset.setAttribute("coordIndex","0 1 2 3 0 -1 4 5 6 7 4 -1 0 4 -1 1 5 -1 2 6 -1 3 7 -1");

            var coords = document.createElement('Coordinate');
            coords.setAttribute("id", "cube");

            var cubeX = cubeSizeX/2.0;
            var cubeY = cubeSizeY/2.0;
            var cubeZ = cubeSizeZ/2.0;
            var cubeXNeg = -cubeSizeX/2.0;
            var cubeYNeg = -cubeSizeY/2.0;
            var cubeZNeg = -cubeSizeZ/2.0;

            var p = {};
            p[0] = ""+ cubeXNeg + " " + cubeYNeg + " " + cubeZNeg + " ";
            p[1] = ""+ cubeX + " " + cubeYNeg + " " + cubeZNeg + " ";
            p[2] = ""+ cubeX + " " + cubeY + " " + cubeZNeg + " ";
            p[3] = ""+ cubeXNeg + " " + cubeY + " " + cubeZNeg + " ";
            p[4] = ""+ cubeXNeg + " " + cubeYNeg + " " + cubeZ + " ";
            p[5] = ""+ cubeX + " " + cubeYNeg + " " + cubeZ + " ";
            p[6] = ""+ cubeX + " " + cubeY + " " + cubeZ + " ";
            p[7] = ""+ cubeXNeg + " " + cubeY + " " + cubeZ + " ";
            var points="";
            for(var i=0; i<8;i++)
            {   points = points+p[i];   }
            coords.setAttribute("point", points);

            lineset.appendChild(coords);
            appearance.appendChild(material);
            shape.appendChild(appearance);
            shape.appendChild(lineset);
            scene.appendChild(shape);

            shape = null;
            appearance = null;
            material = null;
            lineset = null;
            coords = null;
            points = null;
        }

        var trans = document.createElement('Transform');
        trans.setAttribute("id", "trans");

        scene.appendChild(trans);
        this.trans = trans;
        trans = null;

        var annotationTrans = document.createElement("transform");
        annotationTrans.setAttribute("id","AnnotationsGroup");
        scene.appendChild(annotationTrans);
        annotationTrans = null;

        if( oculusRift )
        {   this.appendVRShader(x3dID,sceneID);  }
    };

    this.appendVRShader = function(x3dID,sceneID)
    {
        var scene = document.getElementById(x3dID);
        if( !scene)
        {
            console.log("EarthServerClient::Scene::appendVRShader: Could not find scene element.");
            return;
        }

        var navigation = document.createElement("navigationInfo");
        //navigation.setAttribute("headlight","false");
        navigation.setAttribute("type",'"EXAMINE" "WALK"');
        scene.appendChild(navigation);

        var viewpoint = document.createElement("viewpoint");
        viewpoint.setAttribute("id","EarthServerClient_VR_vpp");
        viewpoint.setAttribute("DEF","EarthServerClient_VR_vp");
        viewpoint.setAttribute("orientation",'0 1 0 -2.99229');
        viewpoint.setAttribute("position",'0 120 0');// TODO: AUTOGENERATE
        viewpoint.setAttribute("zNear","0.1");
        viewpoint.setAttribute("zFar","4000");
        //viewpoint.setAttribute("fieldOfView","1.74");
        scene.appendChild(viewpoint);

        var background = document.createElement("background");
        background.setAttribute("skyColor","0 0 0"); // this has to be black.
        background.setAttribute("DEF","bgnd");
        scene.appendChild(background);

        var groupLEFT = document.createElement("group");
        groupLEFT.setAttribute("DEF","left");

        var shape = document.createElement("shape");
        var plane = document.createElement("plane");
        plane.setAttribute("solid","false");
        var app   = document.createElement("appearance");
        var renderTex = document.createElement("renderedTexture");
        renderTex.setAttribute("id","rtLeft");
        renderTex.setAttribute("stereoMode","LEFT_EYE");
        renderTex.setAttribute("update","ALWAYS");
        renderTex.setAttribute("dimensions",'1280 1600 4');
        renderTex.setAttribute("repeatS",'false');
        renderTex.setAttribute("repeatT",'false');
        renderTex.setAttribute("interpupillaryDistance","0.09");

        var viewpointLeft = document.createElement("viewpoint");
        viewpointLeft.setAttribute("USE","EarthServerClient_VR_vp");
        viewpointLeft.setAttribute("containerField",'viewpoint');
        renderTex.appendChild(viewpointLeft);

        var backgroundLeft = document.createElement("background");
        backgroundLeft.setAttribute("groundAngle",Background_groundAngle);
        backgroundLeft.setAttribute("groundColor",Background_groundColor);
        backgroundLeft.setAttribute("skyAngle",Background_skyAngle);
        backgroundLeft.setAttribute("skyColor",Background_skyColor);
        backgroundLeft.setAttribute("containerField",'background');
        renderTex.appendChild(backgroundLeft);

        var groupLeft = document.createElement("group");
        groupLeft.setAttribute("USE",sceneID);
        groupLeft.setAttribute("containerField","scene");
        renderTex.appendChild(groupLeft);

        var cShader = document.createElement("composedShader");
        var field1  = document.createElement("field");
        field1.setAttribute("name","tex");
        field1.setAttribute("type","SFInt32");
        field1.setAttribute("value","0");
        var field2  = document.createElement("field");
        field2.setAttribute("name","LeftEye");
        field2.setAttribute("type","SFFloat");
        field2.setAttribute("value","1");
        cShader.appendChild(field1);
        cShader.appendChild(field2);

        var vsl = "attribute vec3 position; \n";
        vsl += "attribute vec2 texcoord; \n";
        vsl += "uniform mat4 modelViewProjectionMatrix; \n";
        vsl += "varying vec2 fragTexCoord; \n";
        vsl += "void main() { \n";
        vsl += "vec2 pos = sign(position.xy); \n";
        vsl += "fragTexCoord = texcoord; \n";
        vsl += "gl_Position = vec4((pos.x - 1.0) / 2.0, pos.y, 0.0, 1.0); } \n";

        var vsr = "attribute vec3 position; \n";
        vsr += "attribute vec2 texcoord; \n";
        vsr += "uniform mat4 modelViewProjectionMatrix; \n";
        vsr += "varying vec2 fragTexCoord; \n";
        vsr += "void main() { \n";
        vsr += "vec2 pos = sign(position.xy); \n";
        vsr += "fragTexCoord = texcoord; \n";
        vsr += "gl_Position = vec4((pos.x + 1.0) / 2.0, pos.y, 0.0, 1.0); } \n";

        var vsf = "#ifdef GL_ES \n";
        vsf += "precision highp float; \n";
        vsf += "#endif \n";
        vsf += "uniform sampler2D tex; \n";
        vsf += "uniform float leftEye; \n";
        vsf += "varying vec2 fragTexCoord; \n";
        vsf += "void main() { \n";
        vsf += "float distortionScale = 0.7; \n";
        vsf += "vec2 lensCenter = vec2(0.151976495726, 0.0); \n";
        vsf += "if (leftEye == 0.0) { \n";
        vsf += "lensCenter.x *= -1.0; } \n";
        vsf += "vec2 theta = (fragTexCoord * 2.0) - 1.0; \n";
        vsf += "float rSq = theta.x * theta.x + theta.y * theta.y; \n";
        vsf += "vec2 rvec = theta * (1.0 + 0.22 * rSq + 0.24 * rSq * rSq); \n";
        vsf += "vec2 texCoord = (distortionScale*rvec+(1.0-distortionScale)*lensCenter + 1.0) / 2.0; \n";
        vsf += "if (any(notEqual(clamp(texCoord, vec2(0.0, 0.0), vec2(1.0, 1.0)) - texCoord,vec2(0.0, 0.0)))) \n";
        vsf += "{ discard; } \n";
        vsf += "else { \n";
        vsf += "vec3 col = texture2D(tex, texCoord).rgb; \n";
        vsf += "gl_FragColor = vec4(col, 1.0); }  } \n";

        var shaderPartVertex = document.createElement("shaderPart");
        shaderPartVertex.setAttribute("type","VERTEX");
        shaderPartVertex.innerHTML = vsl;
        cShader.appendChild(shaderPartVertex);

        var shaderPartFragment = document.createElement("shaderPart");
        shaderPartFragment.setAttribute("type","FRAGMENT");
        shaderPartFragment.innerHTML = vsf;
        shaderPartFragment.setAttribute("DEF","frag");
        cShader.appendChild(shaderPartFragment);

        var groupRIGHT = document.createElement("group");
        groupRIGHT.setAttribute("DEF","right");

        var shapeR = document.createElement("shape");
        var planeR = document.createElement("plane");
        planeR.setAttribute("solid","false");
        var appR   = document.createElement("appearance");
        var renderTexR = document.createElement("renderedTexture");
        renderTexR.setAttribute("id","rtRight");
        renderTexR.setAttribute("stereoMode","RIGHT_EYE");
        renderTexR.setAttribute("update","ALWAYS");
        renderTexR.setAttribute("dimensions",'1280 1600 4');
        renderTexR.setAttribute("repeatS",'false');
        renderTexR.setAttribute("repeatT",'false');
        renderTexR.setAttribute("interpupillaryDistance","0.09");

        var viewpointRight = document.createElement("viewpoint");
        viewpointRight.setAttribute("USE","EarthServerClient_VR_vp");
        viewpointRight.setAttribute("containerField",'viewpoint');
        renderTexR.appendChild(viewpointRight);

        var backgroundRight = document.createElement("background");
        backgroundRight.setAttribute("groundAngle",Background_groundAngle);
        backgroundRight.setAttribute("groundColor",Background_groundColor);
        backgroundRight.setAttribute("skyAngle",Background_skyAngle);
        backgroundRight.setAttribute("skyColor",Background_skyColor);
        backgroundRight.setAttribute("containerField",'background');
        renderTexR.appendChild(backgroundRight);

        var groupRight = document.createElement("group");
        groupRight.setAttribute("USE",sceneID);
        groupRight.setAttribute("containerField","scene");
        renderTexR.appendChild(groupRight);

        var cShaderR = document.createElement("composedShader");
        var field1R  = document.createElement("field");
        field1R.setAttribute("name","tex");
        field1R.setAttribute("type","SFInt32");
        field1R.setAttribute("value","0");
        var field2R = document.createElement("field");
        field2R.setAttribute("name","LeftEye");
        field2R.setAttribute("type","SFFloat");
        field2R.setAttribute("value","1");
        cShaderR.appendChild(field1R);
        cShaderR.appendChild(field2R);

        var shaderPartVertexR = document.createElement("shaderPart");
        shaderPartVertexR.setAttribute("type","VERTEX");
        //shaderPartVertexR.setAttribute("url","shader/oculusVertexShaderRight.glsl");
        shaderPartVertexR.innerHTML = vsr;

        cShaderR.appendChild(shaderPartVertexR);

        var shaderPartFragmentR = document.createElement("shaderPart");
        shaderPartFragmentR.setAttribute("type","FRAGMENT");
        shaderPartFragmentR.setAttribute("USE", "frag");
        cShaderR.appendChild(shaderPartFragmentR);

        app.appendChild(renderTex);
        app.appendChild(cShader);
        shape.appendChild(app);
        shape.appendChild(plane);
        groupLEFT.appendChild(shape);
        appR.appendChild(renderTexR);
        appR.appendChild(cShaderR);
        shapeR.appendChild(appR);
        shapeR.appendChild(planeR);
        groupRIGHT.appendChild(shapeR);
        scene.appendChild(groupLEFT);
        scene.appendChild(groupRIGHT);
    };

    /**
     * Creates the axis labels around the cube.
     */
    this.createAxisLabels = function(xLabel,yLabel,zLabel)
    {
        //Use given parameters or default values if parameters are not defined
        xLabel = xLabel || "X";
        yLabel = yLabel || "Y";
        zLabel = zLabel || "Z";

        axisLabels = new EarthServerGenericClient.AxisLabels(cubeSizeX/2, cubeSizeY/2, cubeSizeZ/2);
        axisLabels.createAxisLabels(xLabel,yLabel,zLabel);
    };

    /**
     * @ignore
     * Open a websocket
     * @param location
     * @returns {*}
     */
    this.websocket = function (location)
    {
        if (window.MozWebSocket)
            return new MozWebSocket(location);
        else
            return new WebSocket(location);
    };

    /**
     * @ignore
     * Starts the connection to InstantIO.
     * @param location
     * @param name
     */
    this.start_log = function (location, name)
    {
        var viewpoint = document.getElementById('EarthServerClient_VR_vpp');

        socket_ass = this.websocket(location);
        socket_ass.onmessage = function(event)
        {
            var h = x3dom.fields.SFVec4f.parse(event.data);
            var q = new x3dom.fields.Quaternion(h.x, h.y, h.z, h.w);

            var aa = q.toAxisAngle();

            viewpoint.setAttribute("orientation", aa[0].x + " " + aa[0].y + " " + aa[0].z + " " + aa[1]);
        }
    };

    /**
     * This function starts to load all models. You call this when the html is loaded or later on a click.
     */
    this.createModels = function()
    {
        // overwrite the enterFrame and exitFrame methods of the x3dom runtime (see doc below).
        var element = document.getElementById("x3d");
        element.runtime.enterFrame = EarthServerGenericClient.MainScene.nextFrame;

        // add event listener for keyboard
        document.addEventListener('keypress', function (e) {
            EarthServerGenericClient.MainScene.handleKeys(e);
        }, false);

        if( !oculusRift ) // oculus mode overwrites exit frame itself
        {   element.runtime.exitFrame  = EarthServerGenericClient.MainScene.exitFrame;  }
        else // oculus mode + this.exitframe
        {
            var runtime = null;
            var rtLeft, rtRight;
            var lastW, lastH;

            runtime = document.getElementById('x3d').runtime;
            rtLeft = document.getElementById('rtLeft');
            rtRight = document.getElementById('rtRight');

            lastW = +runtime.getWidth();
            lastH = +runtime.getHeight();

            var hw = Math.round(lastW / 2);
            rtLeft.setAttribute('dimensions',  hw + ' ' + lastH + ' 4');
            rtRight.setAttribute('dimensions', hw + ' ' + lastH + ' 4');

            runtime.exitFrame = function ()
            {
                var w = +runtime.getWidth();
                var h = +runtime.getHeight();

                if (w != lastW || h != lastH)
                {
                    var half = Math.round(w / 2);
                    rtLeft.setAttribute('dimensions',  half + ' ' + h + ' 4');
                    rtRight.setAttribute('dimensions', half + ' ' + h + ' 4');

                    lastW = w;
                    lastH = h;
                }

                EarthServerGenericClient.MainScene.exitFrame();
            };

            this.start_log("ws://localhost:" + InstantIOPort + "/InstantIO/element/ovr/Orientation/data.string", "image");
        }

        // Append the child into the scene
        if( oculusRift ) // oculus mode needs the root node to NOT rendered
        {
            var root = document.getElementById("root");
            root.setAttribute("render","false");
        }

        for(var i=0; i< models.length; i++)
        {
            models[i].createModel(this.trans,cubeSizeX,cubeSizeY,cubeSizeZ);
        }
    };

    /**
     * This function forces the x3dom runtime to render a next frame even if no change to the scene or any
     * movement to from the user occurred. This is needed during the building process of the scene.
     * Data is inserted into the dom with a few frames between them to prevent stalls.
     * If the user does not move the mouse no new frame is drawn and no new data in inserted.
     *
     * This function forces new frames and therefor the insertion of new data.
     */
    this.exitFrame = function()
    {
        if( nextFrameCallback.length !== 0)
        {
            var element = document.getElementById("x3d");
            // NOTE: If the 'x3d' element gets hidden while there are nextFrameCallbacks the element will not be found.
            // In this case we can do nothing else than try it again:
            if (element) {
                element.runtime.canvas.doc.needRender = 1; //set this to true to render even without movement
            }
        }
    };

    /**
     * This function is executed every frame. If a terrain whats to add a chunk
     * it has registered the request and this function let one terrain add a single
     * chunk and wait for a few frames afterwards.
     */
    this.nextFrame = function()
    {
        if( nextFrameCallback.length !== 0)
        {   lastFrameInsert++;  }

        if( nextFrameCallback.length !== 0 && lastFrameInsert >= framesBetweenDomInsertion)
        {
            var callbackIndex = nextFrameCallback.shift();
            if (models[callbackIndex]) {
                models[callbackIndex].terrain.nextFrame();
            }
            lastFrameInsert = 0;
        }
    };

    /**
     * This function lets terrains register their request to add a chunk to the scene.
     * @param modelIndex - Index of the model that uses the terrain.
     */
    this.enterCallbackForNextFrame = function( modelIndex )
    {
        nextFrameCallback.push( modelIndex );
    };

    /**
     * This function removes eventual callbacks for a model (e.g. if a model is removed during pending callbacks).
     * @param modelIndex - Index of the model that uses the terrain.
     */
    this.removeModelCallbacks = function( modelIndex )
    {
        var newCallbacks = [];

        for (var idx = 0; idx < nextFrameCallback.length; idx++) {
            if (nextFrameCallback[idx] !== modelIndex) {
                newCallbacks.push(nextFrameCallback[idx]);
            }
        };
        nextFrameCallback = newCallbacks;
    };

    /**
     * Updates the position of a light.
     * @param lightIndex - Index of the light
     * @param which - Which Axis will be changed (0:X 1:Y 2:Z)
     * @param value - the new position
     */
    this.updateLightPosition = function(lightIndex,which,value)
    {
        var trans = document.getElementById("EarthServerGenericClient_lightTransform"+lightIndex);

        if( trans && which !== undefined && value !== undefined )
        {
            var oldTrans = trans.getAttribute("translation");
            oldTrans = oldTrans.split(" ");
            oldTrans[which] = value;
            trans.setAttribute("translation",oldTrans[0] + " " + oldTrans[1] + " " + oldTrans[2]);
        }
        else
        {
            console.log("EarthServerGenericClient::SceneManager: Can't update light position.");
            console.log("Index " + lightIndex + ", Axis "+ which + " and Position " + value);
        }
    };

    /**
     * Updates the radius of the light with the given index.
     * @param lightIndex - Index of the light.
     * @param value - New radius.
     */
    this.updateLightRadius = function(lightIndex,value)
    {
        var light = document.getElementById("EarthServerGenericClient_Light_"+lightIndex);
        if(light)
        {
            light.setAttribute("radius",value);
        }
        else
        {   console.log("EarthServerGenericClient::SceneManager: Can't find light with index " + lightIndex +".");}
    };

    /**
     * Updates the intensity of the light with the given index.
     * @param lightIndex - Index of the light.
     * @param value - New intensity.
     */
    this.updateLightIntensity = function(lightIndex,value)
    {
        var light = document.getElementById("EarthServerGenericClient_Light_"+lightIndex);
        if(light)
        {
            light.setAttribute("intensity",value);
        }
        else
        {   console.log("EarthServerGenericClient::SceneManager: Can't find light with index " + lightIndex +".");}
    };

    /**
     * Increases the intensity value of the light with the given index by a constant value.
     * @param lightIndex
     */
    this.increaseLightIntensity = function(lightIndex)
    {
        var light = document.getElementById("EarthServerGenericClient_Light_"+lightIndex);
        if(light)
        {
            var currentValue = light.getAttribute("intensity");
            var newValue = parseFloat(currentValue) + 0.1;
            light.setAttribute("intensity",String(newValue));
        }
        else
        {   console.log("EarthServerGenericClient::SceneManager: Can't find light with index " + lightIndex +".");}
    };

    /**
     * Decreases the intensity value of the light with the given index by a constant value.
     * @param lightIndex
     */
    this.decreaseLightIntensity = function(lightIndex)
    {
        var light = document.getElementById("EarthServerGenericClient_Light_"+lightIndex);
        if(light)
        {
            var currentValue = light.getAttribute("intensity");
            var newValue = parseFloat(currentValue) - 0.1;
            light.setAttribute("intensity",String(newValue));
        }
        else
        {   console.log("EarthServerGenericClient::SceneManager: Can't find light with index " + lightIndex +".");}
    };

    /**
     * Update Offset changes the position selected SceneModel on the x-,y- or z-Axis.
     * @param modelIndex - Index of the model that should be altered
     * @param which - Which Axis will be changed (0:X 1:Y 2:Z)
     * @param value - The new position
     */
    this.updateOffset = function(modelIndex,which,value)
    {
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+modelIndex);

        if( trans )
        {
            var offset=0;
            switch(which)
            {
                case 0: offset = cubeSizeX/2.0;
                        break;
                case 1: offset = cubeSizeY/2.0;
                        break;
                case 2: offset = cubeSizeZ/2.0;
                        break;
            }

            var oldTrans = trans.getAttribute("translation");
            oldTrans = oldTrans.split(" ");
            var delta = oldTrans[which] - (value - offset);
            oldTrans[which] = value - offset;
            trans.setAttribute("translation",oldTrans[0] + " " + oldTrans[1] + " " + oldTrans[2]);
            models[modelIndex].movementUpdateBindings(which,delta);
        }
    };

    /**
     * Changes the position of the selected SceneModel on the x-,y- or z-Axis by the given delta.
     * @param modelIndex - Index of the model that should be altered
     * @param which - Which Axis will be changed (0:X 1:Y 2:Z)
     * @param delta - Delta to change the current position.
     */
    this.updateOffsetByDelta = function(modelIndex,which,delta)
    {
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+modelIndex);

        if( trans )
        {
            var oldTrans = trans.getAttribute("translation");
            oldTrans = oldTrans.split(" ");
            oldTrans[which] = parseFloat(oldTrans[which]) - parseFloat(delta);
            trans.setAttribute("translation",oldTrans[0] + " " + oldTrans[1] + " " + oldTrans[2]);
            models[modelIndex].movementUpdateBindings(which,delta);
        }
        else
        {   console.log("EarthServerGenericClient::SceneManager: Can't find transformation for model with index " + modelIndex);}
    };

    /**
     * Updates the model's number of shown elements/layers.
     * @param moduleIndex - Index of the model
     * @param value - Number of elements
     */
    this.updateMaxShownElements = function(moduleIndex,value)
    {
        if( moduleIndex <models.length && moduleIndex >=0)
            models[moduleIndex].updateMaxShownElements(value);
    };

    /**
     * This changes the scaling of all models on the Y-Axis.
     * @param value - The base elevation is multiplied by this value
     */
    this.updateElevationOfAllModels = function(value)
    {
        globalElevationValue = value;

        for(var i=0; i< models.length; i++)
        {
            this.updateElevation(i,value);
        }
    };

    /**
     * Increases the global elevation by a constant factor.
     */
    this.increaseGlobalElevation = function()
    {
        globalElevationValue++;
        this.updateElevationOfAllModels(globalElevationValue);
    };

    /**
     * Decreases the global elevation by a constant factor.
     */
    this.decreaseGlobalElevation = function()
    {
        if(globalElevationValue > 1) // don't let global elevation value get negative or 0
        {
            globalElevationValue--;
            this.updateElevationOfAllModels(globalElevationValue);
        }
    };

    /**
     * This changes the scaling on the Y-Axis(Elevation).
     * @param modelIndex - Index of the model that should be altered
     * @param value - The base elevation is multiplied by this value
     */
    this.updateElevation = function(modelIndex,value)
    {
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+modelIndex);

        if( trans )
        {
            var transValue = trans.getAttribute("scale");
            var oldTrans = transValue.split(" ");

            if( baseElevation[modelIndex] === undefined)
            {
                baseElevation[modelIndex] = oldTrans[1];
            }

            oldTrans[1] = value*baseElevation[modelIndex]/10;

            trans.setAttribute("scale",oldTrans[0] + " " + oldTrans[1] + " " + oldTrans[2]);

            models[modelIndex].updateTranslationForElevation(oldTrans[1]);
            models[modelIndex].elevationUpdateBinding(value);
        }
    };

    /**
     * This changes the scaling on the X-Axis(Width).
     * @param modelIndex - Index of the model that should be altered
     * @param value - The base elevation is multiplied by this value
     */
    this.updateWidth = function(modelIndex,value)
    {
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+modelIndex);

        if( trans )
        {
            var oldTrans = trans.getAttribute("scale");
            oldTrans = oldTrans.split(" ");

            if( baseWidth[modelIndex] === undefined)
            {
                baseWidth[modelIndex] = oldTrans[0];
            }

            oldTrans[0] = value*baseWidth[modelIndex]/10;

            trans.setAttribute("scale",oldTrans[0] + " " + oldTrans[1] + " " + oldTrans[2]);
            models[modelIndex].elevationUpdateBinding();
        }
    };

    /**
     * This changes the scaling on the Z-Axis(Length).
     * @param modelIndex - Index of the model that should be altered
     * @param value - The base elevation is multiplied by this value
     */
    this.updateLength = function(modelIndex,value)
    {
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+modelIndex);

        if( trans )
        {
            var oldTrans = trans.getAttribute("scale");
            oldTrans = oldTrans.split(" ");

            if( baseLength[modelIndex] === undefined)
            {
                baseLength[modelIndex] = oldTrans[2];
            }

            oldTrans[2] = value*baseLength[modelIndex]/10;

            trans.setAttribute("scale",oldTrans[0] + " " + oldTrans[1] + " " + oldTrans[2]);
            models[modelIndex].elevationUpdateBinding();
        }
    };

    /**
     * Updates the model's size for rendering points.
     * @param modelIndex - Index of the model that should be altered
     * @param value - New point size
     */
    this.updatePointSize = function(modelIndex,value)
    {
        if( modelIndex <models.length && modelIndex >=0)
            models[modelIndex].updatePointSize(value);

    };

    /**
     * Returns the elevation value of a scene model at a specific point in the 3D scene.
     * The point is checked in the current state of the scene with all transformations.
     * @param modelIndex - Index of the model.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height on the y-axis.
     */
    this.getHeightAt3DPosition = function(modelIndex,xPos,zPos)
    {
        if(modelIndex >= 0 && modelIndex < models.length)
        {
            return models[modelIndex].getHeightAt3DPosition(xPos,zPos);
        }
        else
        {   return 0;   }
    };

    /**
     * Returns the dem value of a scene model at a specific point in the 3D scene.
     * @param modelIndex - Index of the model.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height of the dem.
     */
    this.getDemValueAt3DPosition = function(modelIndex,xPos,zPos)
    {
        if(modelIndex >= 0 && modelIndex < models.length)
        {
            return models[modelIndex].getDemValueAt3DPosition(xPos,zPos);
        }
        else
        {   return 0;   }
    };

    /**
     * Changes the transparency of the Scene Model.
     * @param modelIndex - Index of the model that should be altered
     * @param value - New Transparency between 0-1 (Fully Opaque - Fully Transparent)
     */
    this.updateTransparency = function(modelIndex,value)
    {
        if(modelIndex < models.length)
        {   models[modelIndex].updateTransparency(value);   }
    };

    /**
     * Example function for the onClick event.
     * @param modelIndex - Index of the clicked model.
     * @param hitPoint - Array with the coordinates in screen space.
     */
    this.OnClickFunction = function(modelIndex,hitPoint)
    {
        /*
            Does nothing per default but provide a small example.
            Overwrite this function with custom code.
        */
        //var height = this.getHeightAt3DPosition(modelIndex,hitPoint[0],hitPoint[2]);
        //var height = this.getDemValueAt3DPosition(modelIndex,hitPoint[0],hitPoint[2]);
        //alert(height);
    };

    /**
     * This creates the UI for the Scene.
     * @param domElementID - The dom element where to append the UI.
     */
    this.createUI = function(domElementID)
    {
        this.UIID = domElementID;
        EarthServerGenericClient.createBasicUI(domElementID);
    };

    // init keymapping
    this.initKeyMapping();
};

// Create main scene
EarthServerGenericClient.MainScene = new EarthServerGenericClient.SceneManager();
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Annotation Layer to create multiple Annotations with the same style who belong together.
 * @param Name - Name of the Layer. To be displayed and to add annotations to it.
 * @param root - X3dom element to append the annotations.
 * @param fontSize - Font size of the annotations.
 * @param fontColor - Font color of the annotations
 * @param fontHover - The annotations hovers above the marker by this value.
 * @param markerSize - Size of the annotations marker.
 * @param markerColor - Color of the annotations marker.
 * @constructor
 */
EarthServerGenericClient.AnnotationLayer = function(Name,root,fontSize,fontColor,fontHover,markerSize,markerColor)
{

    this.name = Name;   // Name of this layer
    var annotationTransforms = []; // Array with all annotation text transforms
    var annotations = [];   // The text of the annotations (displayed in the UI)
    var markerTransforms = []; // Array with all marker transforms
    var modelIndex = -1;    // Index of the model this layer is bound to (-1 for unbound)

    /**
     * Sets the index of the scene model this annotation layer is bound to.
     * @param index - Index of the scene model.
     */
    this.setBoundModuleIndex = function(index)
    {
        modelIndex = index;
    };

    /**
     * Returns the index of the model this layer is bound to.
     * @returns {number} - Index of the model or -1 if unbound.
     */
    this.getBoundModuleIndex = function()
    {
        return modelIndex;
    };

    /**
     * Resets the modelIndex this annotation layer is bound to back to -1 and marks it as unbound.
     */
    this.releaseBinding = function()
    {
        modelIndex = -1;
    };

    /**
     * If the annotation layer is bound to a module the annotations shall move when the module is moved.
     * This function shall receive the delta of the positions every time the module is moved.
     * @param axis - Axis of the movement.
     * @param delta - Delta to the last position.
     */
    this.movementUpdateBoundModule = function(axis,delta)
    {
        if( axis >= 0 && axis < 3)
        {
            for(var i=0; i<annotationTransforms.length;i++)
            {
                var trans = annotationTransforms[i].getAttribute("translation");
                var transValue = trans.split(" ");

                if( transValue.length < 3)
                { transValue = trans.split(",");}

                if(i%2 === 0 || axis === 1)
                {   transValue[axis] = parseInt(transValue[axis]) - parseInt(delta); }
                else
                {   transValue[axis] = parseInt(transValue[axis]) + parseInt(delta); }

                annotationTransforms[i].setAttribute("translation",transValue[0] + " " + transValue[1] + " " + transValue[2]);
            }
            for( i=0; i<markerTransforms.length;i++)
            {
                trans = markerTransforms[i].getAttribute("translation");
                transValue = trans.split(" ");

                if( transValue.length < 3)
                { transValue = trans.split(",");}

                transValue[axis] = parseInt(transValue[axis]) - parseInt(delta);
                markerTransforms[i].setAttribute("translation",transValue[0] + " " + transValue[1] + " " + transValue[2]);
            }
        }


    };

    /**
     * This function notifies the annotation layer that the scene model's elevation was changed.
     * All annotation will be checked and altered in their position.
     */
    this.elevationUpdateBoundModule = function()
    {
        for(var i=0; i<annotationTransforms.length;i++)
        {
            var trans = annotationTransforms[i].getAttribute("translation");
            var transValue = trans.split(" ");
            var mirror = 1;//We have to multiply the backside text positions with -1

            if( transValue.length < 3)
            { transValue = trans.split(",");}


            if(i%2 === 1)
            {   mirror = -1;    }

            transValue[1] = EarthServerGenericClient.MainScene.getHeightAt3DPosition(modelIndex,parseInt(transValue[0])*mirror,parseInt(transValue[2])*mirror) + fontHover;
            annotationTransforms[i].setAttribute("translation",transValue[0] + " " + transValue[1] + " " + transValue[2]);
        }

        for( i=0; i<markerTransforms.length;i++)
        {
            trans = markerTransforms[i].getAttribute("translation");
            transValue = trans.split(" ");

            if( transValue.length < 3)
            { transValue = trans.split(",");}

            transValue[1] = EarthServerGenericClient.MainScene.getHeightAt3DPosition(modelIndex,parseInt(transValue[0]),parseInt(transValue[2]));
            markerTransforms[i].setAttribute("translation",transValue[0] + " " + transValue[1] + " " + transValue[2]);
        }

    };

    /**
     * Adds an annotation marker and -text to the annotation layer.
     * @param xPos - Position on the X-Axis of the marker and center of the annotation.
     * @param yPos - Position on the Y-Axis of the marker and center of the annotation.
     * @param zPos - Position on the Z-Axis of the marker and center of the annotation.
     * @param Text - Text for the annotation.
     */
    this.addAnnotation = function(xPos,yPos,zPos,Text)
    {

        annotations.push(Text);//save the text for later queries

        //We draw 2 texts without their back faces.
        //So the user can see the text from most angles and not mirror inverted.
        for(var i=0;i<2;i++)
        {
            var textTransform = document.createElement('transform');
            textTransform.setAttribute('scale', fontSize + " " + fontSize + " " + fontSize);
            var shape = document.createElement('shape');
            var appearance = document.createElement('appearance');
            appearance.setAttribute("id","Layer_Appearance_"+Name);
            var material = document.createElement('material');
            material.setAttribute('emissiveColor', fontColor);
            material.setAttribute('diffuseColor', fontColor);
            var text = document.createElement('text');
            text.setAttribute('string', Text);
            var fontStyle = document.createElement('fontStyle');
            fontStyle.setAttribute('family', 'calibri');
            fontStyle.setAttribute('style', 'bold');
            text.appendChild(fontStyle);
            appearance.appendChild(material);
            shape.appendChild(appearance);
            shape.appendChild(text);
            textTransform.appendChild(shape);

            //one marker is enough
            if(i===0)
            {
                var sphere_trans = document.createElement("Transform");
                sphere_trans.setAttribute("scale",markerSize + " " + markerSize + " "+markerSize);
                sphere_trans.setAttribute('translation', xPos + " " + yPos + " " + zPos);
                var sphere_shape = document.createElement("Shape");
                var sphere = document.createElement("Sphere");
                var sphere_app = document.createElement("Appearance");
                var sphere_material = document.createElement('material');
                sphere_material.setAttribute('diffusecolor', markerColor);
                sphere_app.appendChild(sphere_material);
                sphere_shape.appendChild(sphere_app);
                sphere_shape.appendChild(sphere);
                sphere_trans.appendChild(sphere_shape);

                root.appendChild(sphere_trans);
                //annotationTransforms.push(sphere_trans);
                markerTransforms.push(sphere_trans);

                sphere_trans = null;
                sphere_shape = null;
                sphere = null;
                sphere_app = null;
                sphere_material = null;
            }

            var rootTransform = document.createElement('transform');

            textTransform.setAttribute('translation', xPos + " " + (yPos+fontHover) + " " + zPos);
            textTransform.setAttribute('scale', (-fontSize) + " " + (-fontSize) + " " + fontSize);

            //One text "normal" and one "mirror inverted"
            if(i===0)
            {
                textTransform.setAttribute('rotation', '0 0 1 3.14');
            }
            else
            {
                textTransform.setAttribute('rotation', '0 0 1 3.14');
                textTransform.setAttribute('translation', -xPos + " " + (yPos+fontHover) + " " + -zPos);
                rootTransform.setAttribute('rotation', '0 1 0 3.14');
            }

            //annotationTransforms.push(rootTransform);//save the transform to toggle rendering
            annotationTransforms.push(textTransform);
            rootTransform.appendChild(textTransform);
            root.appendChild( rootTransform );
        }

        textTransform = null;
        shape = null;
        appearance = null;
        material = null;
        text = null;
        fontStyle = null;
    };

    /**
     * Determine the rendering of this layer.
     * @param value - boolean
     */
    this.renderLayer = function( value )
    {
        for(var i=0; i<annotationTransforms.length;i++)
        {
            annotationTransforms[i].setAttribute("render",value);
        }
        for(i=0; i<markerTransforms.length;i++)
        {
            markerTransforms[i].setAttribute("render",value);
        }
    };


    /**
     * Returns an array with the annotation text.
     * @returns {Array}
     */
    this.getAnnotationTexts = function()
    {
        var arrayReturn = [];

        for(var i=0; i<annotations.length;i++)
        {   arrayReturn.push(annotations[i]);    }

        return arrayReturn;
    };
};

/**
 * @class AxisLabels
 * @description This class generates labels for each axis and side (except bottom) of the bounding box.
 *
 * @param xSize - The width of the bounding box.
 * @param ySize - The height of the bounding box.
 * @param zSize - The depth of the bounding box.
 * @param textHover - Distance between the bounding box and the text.
 */
EarthServerGenericClient.AxisLabels = function(xSize, ySize, zSize, textHover)
{
    /**
     * @description Defines the color of the text. Default at start: emissiveColor attribute is set, the diffuseColor one isn't.
     * @type {string}
     * @default "0.7 0.7 0.5"
     */
    var fontColor = "0.7 0.7 0.5";

    /**
     * Distance between the bounding box and the text.
     * @type {number}
     */
    var hover = textHover || ((xSize + ySize + zSize) / 150);

    /**
     * @description Array stores all X3DOM transform nodes. Each transform contains the shape, material, text and fontStyle node.
     * @type {Array}
     * @default Empty
     */
    var transforms = [];
    /**
     * @description Array stores all text nodes of the x-axis.
     * @type {Array}
     * @default Empty
     */
    var textNodesX = [];
    /**
     * @description Array stores all text nodes of the y-axis.
     * @type {Array}
     * @default Empty
     */
    var textNodesY = [];
    /**
     * @description Array stores all text nodes of the z-axis.
     * @type {Array}
     * @default Empty
     */
    var textNodesZ = [];

    /**
     * @description This function changes the text size of each label independent of its axis.
     * @param size
     * The parameter (positive value expected) represents the desired size of the font.
     * Remember, the parameter represents the size in x3dom units not in pt like css.
     * Hence the size value could be large.
     */
    this.changeFontSize = function(size)
    {
        size = Math.abs(size);
        for(var i=0; i<transforms.length; i++)
        {
            var scale =x3dom.fields.SFVec3f.parse(transforms[i].getAttribute('scale'));

            if(scale.x>=0) scale.x = size; else scale.x = -1 * size;
            if(scale.y>=0) scale.y = size; else scale.y = -1 * size;
            if(scale.z>=0) scale.z = size; else scale.z = -1 * size;

            transforms[i].setAttribute('scale', scale.x + " " + scale.y + " " + scale.z);
        }
    };

    /**
     * This function changes the color of each label independent of its axis.
     * @param color
     * This parameter changes the current color value of each label.
     * It expects a string in x3d color format.
     * E.g. "1.0 1.0 1.0" for white and "0.0 0.0 0.0" for black.
     */
    this.changeColor = function(color)
    {
        for(var i=0; i<transforms.length; i++)
        {
            var material = transforms[i].getElementsByTagName('material');

            for(var j=0; j<material.length; j++)
            {
                material[j].setAttribute('emissiveColor', color);
                material[j].setAttribute('diffuseColor', color);
            }
        }
    };

    /**
     * @description This function changes the text of each label on the x-axis.
     * @param string
     * Defines the new text.
     */
    this.changeLabelNameX = function(string)
    {
        //Prevent multi line!
        while(string.search("'")!=-1 || string.search("\"")!=-1)
        {
            string = string.replace("'", " ");
            string = string.replace("\"", " ");
        }

        for(var i=0; i<textNodesX.length; i++)
        {
            textNodesX[i].setAttribute('string', string);
        }
    };

    /**
     * @description This function changes the text of each label on the y-axis.
     * @param string
     * Defines the new text.
     */
    this.changeLabelNameY = function(string)
    {
        //Prevent multi line!
        while(string.search("'")!=-1 || string.search("\"")!=-1)
        {
            string = string.replace("'", " ");
            string = string.replace("\"", " ");
        }

        for(var i=0; i<textNodesY.length; i++)
        {
            textNodesY[i].setAttribute('string', string);
        }
    };

    /**
     * @param string
     * Defines the new text.
     */
    this.changeLabelNameZ = function(string)
    {
        //Prevent multi line!
        while(string.search("'")!=-1 || string.search("\"")!=-1)
        {
            string = string.replace("'", " ");
            string = string.replace("\"", " ");
        }

        for(var i=0; i<textNodesZ.length; i++)
        {
            textNodesZ[i].setAttribute('string', string);
        }
    };

    /**
     * @description This function generates labels on all three axis (x,y,z). The labels will be
     * added on each side (except bottom).
     */
    this.createAxisLabels = function(xLabel,yLabel,zLabel)
    {
        createLabel("x", "front", xLabel);
        createLabel("x", "back",  xLabel);
        createLabel("x", "top",   xLabel);

        createLabel("y", "front", yLabel);
        createLabel("y", "back",  yLabel);
        createLabel("y", "left",  yLabel);
        createLabel("y", "right", yLabel);

        createLabel("z", "front", zLabel);
        createLabel("z", "back",  zLabel);
        createLabel("z", "top",   zLabel);
    };

    /**
     * @description This (private) function creates the needed x3dom nodes.
     *
     * @param axis
     * Which axis do you want? Available: x, y, z
     *
     * @param side
     * Choose the side of the axis. <br>
     * Available for x: front (default), back and top. <br>
     * Available for y: front (default), back, left and right. <br>
     * Available for z: front (default), back and top.
     *
     * @param label
     * This text will appear at the given axis.
     */
    function createLabel(axis, side, label)
    {
        //Setup text
        var textTransform = document.createElement('transform');
        textTransform.setAttribute('scale', xSize/5 + " " + ySize/5 + " " + zSize/5);
        var shape = document.createElement('shape');
        var appearance = document.createElement('appearance');
        var material = document.createElement('material');
        material.setAttribute('emissiveColor', fontColor);
        var text = document.createElement('text');
        text.setAttribute('string', label);
        var fontStyle = document.createElement('fontStyle');
        fontStyle.setAttribute('family', 'calibri');
        fontStyle.setAttribute('style', 'bold');
        text.appendChild(fontStyle);
        appearance.appendChild(material);
        shape.appendChild(appearance);
        shape.appendChild(text);
        textTransform.appendChild(shape);

        //var home = document.getElementById('x3dScene');
        var home = document.getElementById('AnnotationsGroup');
        var rotationTransform = document.createElement('transform');

        if(axis=="x")
        {
            textTransform.setAttribute('translation', "0 " + (ySize+hover) + " " + zSize);

            if(side=="back")
            {
                rotationTransform.setAttribute('rotation', '0 1 0 3.14');
            }
            else if(side=="top")
            {
                textTransform.setAttribute('rotation', '1 0 0 -1.57');
                textTransform.setAttribute('translation', "0 " + -ySize + " " + (-zSize-hover));
            }
            textNodesX[textNodesX.length] = text;
        }
        else if(axis=="y")
        {
            textTransform.setAttribute('translation', -(xSize+hover) + " 0 " + zSize);
            textTransform.setAttribute('rotation', '0 0 1 1.57');

            if(side=="back")
            {
                textTransform.setAttribute('translation', (xSize+hover) + " 0 " + zSize);
                textTransform.setAttribute('rotation', '0 0 1 4.74');
                rotationTransform.setAttribute('rotation', '1 0 0 3.14');
            }
            else if(side=="left")
            {
                rotationTransform.setAttribute('rotation', '0 1 0 -1.57');
            }
            else if(side=="right")
            {
                rotationTransform.setAttribute('rotation', '0 1 0 1.57');
            }
            textNodesY[textNodesY.length] = text;
        }
        else if(axis=="z")
        {
            textTransform.setAttribute('translation', xSize + " " + (ySize+hover) + " 0");
            textTransform.setAttribute('rotation', '0 1 0 1.57');
            if(side=="back")
            {
                rotationTransform.setAttribute('rotation', '0 1 0 3.14');
            }
            else if(side=="top")
            {
                textTransform.setAttribute('rotation', '0 1 0 1.57');
                textTransform.setAttribute('translation', "0 0 0");

                rotationTransform.setAttribute('rotation', '0 0 1 -4.71');
                rotationTransform.setAttribute('translation', -(xSize+hover) + " " + -ySize + " 0");
            }
            textNodesZ[textNodesZ.length] = text;
        }

        transforms[transforms.length]=textTransform;
        rotationTransform.appendChild(textTransform);
        home.appendChild(rotationTransform);
    }
};
/**
 * @class Builds one elevation grid chunk. It can consists of several elevation grids to be used in a LOD.
 * For every appearance in the appearances parameter one level is built with 25% size of the last level.
 * @param parentNode - Dom element to append the elevation grids to.
 * @param info - Information about the ID,position of the chunk, the height map's size and the modelIndex.
 * @param hf - The height map to be used for the elevation grid.
 * @param appearances - Array of appearances. For every appearance one level for LOD is built. 1 Level = no LOD.
 * @constructor
 */
function ElevationGrid(parentNode,info, hf,appearances)
{
    /**
     * Creates and inserts elevation grid (terrain chunk) into the DOM.
     */
    function setupChunk()
    {

        try
        {
            var elevationGrid, shape, shf;

            // We build one level of a LOD for every appearance. Example: With 3 children means: [Full Resolution, 1/2 Resolution, 1/4 Resolution]
            for(var i=0; i<appearances.length; i++)
            {
                // All none full resolutions needs to be one element bigger to keep the desired length
                var add = 0;
                if(i !== 0)
                { add = 1;  }

                // Set up: Shape-> Appearance -> ImageTexture +  Texturetransform
                shape = document.createElement('Shape');
                shape.setAttribute("id",info.modelIndex+"_shape_"+info.ID+"_"+i);

                // Build the Elevation Grids
                // shrink the heightfield to the correct size for this detail level
                shf = shrinkHeightMap(hf, info.chunkWidth, info.chunkHeight,Math.pow(2,i));
                elevationGrid = document.createElement('ElevationGrid');
                elevationGrid.setAttribute("id", info.modelIndex+"hm"+ info.ID+"_"+i);
                elevationGrid.setAttribute("solid", "false");
                elevationGrid.setAttribute("xSpacing", String(parseInt(Math.pow(2,i))));// To keep the same size with fewer elements increase the space of one element
                elevationGrid.setAttribute("zSpacing", String(parseInt(Math.pow(2,i))));
                elevationGrid.setAttribute("xDimension", String(info.chunkWidth/Math.pow(2,i)+add));// fewer elements in every step
                elevationGrid.setAttribute("zDimension", String(info.chunkHeight/Math.pow(2,i)+add));
                elevationGrid.setAttribute("height", shf );
                elevationGrid.appendChild(calcTexCoords(info.xpos, info.ypos, info.chunkWidth, info.chunkHeight, info.terrainWidth, info.terrainHeight,Math.pow(2,i)));

                shape.appendChild(appearances[i]);
                shape.appendChild(elevationGrid);

                parentNode.appendChild(shape);

                // set vars null
                shf = null;
                shape = null;
                elevationGrid = null;
            }
            hf = null;
            parentNode = null;
            info = null;
            appearances = null;
        }
        catch(error)
        {
            alert('ElevationGrid::setupChunk(): ' + error);
        }
    }

    /**
     * Shrinks the heightfield with the given factor
     * @param heightfield - The used heihgfield.
     * @param sizex - Width of the heightfield.
     * @param sizey - Height of the heightfield.
     * @param shrinkfactor - Factor to shrink the heightmap. 1:Full heightmap 2: 25% (scaled 50% on each side)
     * @returns {string}
     */
    function shrinkHeightMap(heightfield, sizex, sizey, shrinkfactor)
    {
        var smallGrid, smallx, smally, val,i,k,l,o,div;

        smallGrid = [];
        smallx = parseInt(sizex/shrinkfactor);
        smally = parseInt(sizey/shrinkfactor);
        //IF shrunk, the heightfield needs one more element than the desired length (63 elements for a length of 62)
        if( shrinkfactor !== 1)
        {
            smallx++;
            smally++;
            div=shrinkfactor*shrinkfactor;

            for(i=0; i<smally; i++)
            {
                var i_sf = (i*shrinkfactor);

                for(k=0; k<smallx; k++)
                {
                    var k_sf = (k*shrinkfactor);
                    val = 0;
                    for(l=0; l<shrinkfactor; l++)
                    {
                        for(o=0; o<shrinkfactor; o++)
                        {
                            var x = k_sf + l;
                            var y = i_sf + o;
                            if(x >= sizex) x = sizex -1;
                            if(y >= sizey) y = sizey -1;
                            var tmp = heightfield[y][x];
                            val = val + parseFloat(tmp);
                        }
                    }
                    val = val/div;
                    smallGrid.push(val+ " ");
                }
            }
        }
        else
        {
            for(i=0; i<smally; i++)
            {
                for(k=0; k<smallx; k++)
                {
                    val = parseFloat( heightfield[i][k]);
                    smallGrid.push(val+" ");
                }
            }
        }
        return smallGrid.join(" ");
    }

    /**
     * Calcs the TextureCoordinates for the elevation grid(s).
     * Use the values of the full/most detailed version if using for LOD and adjust only the shrinkfactor parameter.
     * @param xpos - Start position of the elevation grid within the terrain.
     * @param ypos - Start position of the elevation grid within the terrain.
     * @param sizex - Size of the elevation grid on the x-Axis.
     * @param sizey - Size of the elevation grid on the x-Axis.
     * @param terrainWidth - Size of the whole terrain on the x-Axis.
     * @param terrainHeight - Size of the whole terrain on the y-Axis.
     * @param shrinkfactor - The factor the heightmap this TextureCoordinates are was shrunk.
     * @returns {HTMLElement} - X3DOM TextureCoordinate Node.
     */
    function calcTexCoords(xpos,ypos,sizex,sizey,terrainWidth, terrainHeight, shrinkfactor)
    {
        var tmpx, tmpy;

        var smallx = parseInt(sizex/shrinkfactor);
        var smally = parseInt(sizey/shrinkfactor);

        if( shrinkfactor !== 1)
        {
            smallx++;
            smally++;
        }

        var buffer = [];
        //Create Node
        var tcnode = document.createElement("TextureCoordinate");

        //File string
        for (var i = 0; i < smally; i++)
        {
            for (var k = 0; k < smallx; k++)
            {
                tmpx = parseFloat((xpos+(k*shrinkfactor))/(terrainWidth-1));
                tmpy = parseFloat((ypos+(i*shrinkfactor))/(terrainHeight-1));

                buffer.push(tmpx + " ");
                buffer.push(tmpy + " ");
            }
        }
        var tc = buffer.join("");

        tcnode.setAttribute("point", tc);

        return tcnode;
    }

    setupChunk();
}
/**
 * @class Builds one grid that contains gaps (NODATA zones) into a chunk.
 * @param parentNode - Dom element to append the gap grid to.
 * @param info - Information about the ID,position of the chunk, the height map's size and the modelIndex.
 * @param hf - The height map to be used for the elevation grid.
 * @param appearances - Appearances for the Gap Grid.
 * @param NODATA - The NODATA value. Parts with this values are left as a gap in the grid.
 * @constructor
 */
function GapGrid(parentNode,info, hf,appearances,NODATA)
{
    /**
     * Creates and inserts elevation grid (terrain chunk) into the DOM.
     */
    function setupChunk()
    {

        try
        {
            var grid, shape, coords, coordsNode;

            shape = document.createElement('Shape');
            shape.setAttribute("id",info.modelIndex+"_shape_"+info.ID+"_"+0);

            coords = buildCoordinates(hf, info.chunkWidth, info.chunkHeight,NODATA);
            coordsNode = document.createElement('Coordinate');
            coordsNode.setAttribute("point", coords.coords);

            grid = document.createElement('IndexedFaceSet');
            grid.setAttribute("id", info.modelIndex+"hm"+ info.ID+"_"+0);
            grid.setAttribute("solid", "false");
            grid.setAttribute("colorPerVertex", "false");

            grid.setAttribute("creaseAngle", "0.01");
            grid.setAttribute("ccw", "true");

            grid.setAttribute("coordIndex", coords.index);
            grid.appendChild( coordsNode );
            grid.appendChild(calcTexCoords(info.xpos, info.ypos, info.chunkWidth, info.chunkHeight, info.terrainWidth, info.terrainHeight,Math.pow(2,0)));

            if(appearances.length )
            {   shape.appendChild(appearances[0]);  }
            shape.appendChild(grid);

            parentNode.appendChild(shape);

            // set vars null
            coords = null;
            coordsNode = null;
            shape = null;
            grid = null;

            hf = null;
            parentNode = null;
            info = null;
            appearances = null;
        }
        catch(error)
        {
            alert('GapGrid::setupChunk(): ' + error);
        }
    }

    /**
     * Shrinks the heightfield with the given factor
     * @param heightfield - The used heightfield.
     * @param sizex - Width of the heightfield.
     * @param sizey - Height of the heightfield.
     * @param NODATA - The value that a considered as NODATA available and shall be left as a gap
     * @returns {Object}
     */
    function buildCoordinates(heightfield, sizex, sizey, NODATA)
    {
        var coords = {};
        coords.coords = [];
        coords.index  = [];

        // add the coords
        for(var o=0; o< sizey; o++)
        {
            for(var j=0; j<sizex; j++)
            {
                coords.coords.push(""+ j + " " + heightfield[o][j] + " " + o + " ");
            }
        }

        for(var i=0; i+1< sizey; i++)
        {
            for(var k=0; k+1<sizex; k++)
            {
                // check if NONE of the four vertices used for this face as a NODATA value
                if( heightfield[i][k] !== NODATA && heightfield[i+1][k] !== NODATA
                     && heightfield[i+1][k+1] !== NODATA && heightfield[i][k+1] !== NODATA)
                {
                    // add indices
                    coords.index.push( (i*sizex)+k );
                    coords.index.push( ((i*sizex)+1)+k );
                    coords.index.push( (((i+1)*sizex)+1)+k );
                    coords.index.push( ((i+1)*sizex)+k );

                    coords.index.push( -1 );
                }
            }
        }

        return coords;
    }


    /**
     * Calcs the TextureCoordinates for the elevation grid(s).
     * Use the values of the full/most detailed version if using for LOD and adjust only the shrinkfactor parameter.
     * @param xpos - Start position of the elevation grid within the terrain.
     * @param ypos - Start position of the elevation grid within the terrain.
     * @param sizex - Size of the elevation grid on the x-Axis.
     * @param sizey - Size of the elevation grid on the x-Axis.
     * @param terrainWidth - Size of the whole terrain on the x-Axis.
     * @param terrainHeight - Size of the whole terrain on the y-Axis.
     * @param shrinkfactor - The factor the heightmap this TextureCoordinates are was shrunk.
     * @returns {HTMLElement} - X3DOM TextureCoordinate Node.
     */
    function calcTexCoords(xpos,ypos,sizex,sizey,terrainWidth, terrainHeight, shrinkfactor)
    {
        var tmpx, tmpy;

        var smallx = parseInt(sizex/shrinkfactor);
        var smally = parseInt(sizey/shrinkfactor);

        if( shrinkfactor !== 1)
        {
            smallx++;
            smally++;
        }

        var buffer = [];
        //Create Node
        var tcnode = document.createElement("TextureCoordinate");

        //File string
        for (var i = 0; i < smally; i++)
        {
            for (var k = 0; k < smallx; k++)
            {
                tmpx = parseFloat((xpos+(k*shrinkfactor))/(terrainWidth-1));
                tmpy = parseFloat((ypos+(i*shrinkfactor))/(terrainHeight-1));

                buffer.push(tmpx + " ");
                buffer.push(tmpy + " ");
            }
        }
        var tc = buffer.join("");

        tcnode.setAttribute("point", tc);

        return tcnode;
    }

    setupChunk();
}
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Abstract base class for scene models.
 */
EarthServerGenericClient.AbstractSceneModel = function(){
    /**
     * Sets the name of the scene model.
     * @param modelName - Name of the model.
     */
    this.setName = function(modelName){
        this.name = String(modelName);
    };

    /**
     * Returns the name of the model.
     * @returns {String}
     */
    this.getName = function()
    {
        return this.name;
    };

    /**
     * Sets the area of interest for the model. (Lower Corner, Upper Corner)
     * @param minx - Minimum/Lower Latitude
     * @param miny - Minimum/Lower Longitude
     * @param maxx - Maximum/Upper Latitude
     * @param maxy - Maximum/Upper Longitude
     * @param minh - Minimum/Lower Height
     * @param maxh - Maximum/Upper Height
     */
    this.setAreaOfInterest = function(minx,miny,maxx,maxy,minh,maxh){
        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;
        this.minh = minh;
        this.maxh = maxh;
    };

    /**
     * Returns object with the area of interest of the model. (minx,miny,maxx,maxy)
     * @returns {{}}
     */
    this.getAreaOfInterest = function()
    {
        var aoi = {};
        aoi.minx = this.minx;
        aoi.miny = this.miny;
        aoi.maxx = this.maxx;
        aoi.maxy = this.maxy;

        return aoi;
    };

    /**
     * Sets the height resolution of the model. This effects the scaling of the elevation of the model.
     * The parameter should be the difference between the smallest and biggest value of the DEM.
     * Make the sure the value fits to the model's size.
     * @param value
     */
    this.setHeightResolution = function( value )
    {
        if( !isNaN(value) ) // has to be a number or undefined behavior will occur
        {
            this.YResolution = value;
        }
    };

    /**
     * Sets the resolution of the scene model (if possible).
     * @param xRes - Resolution on the x-axis/Latitude
     * @param zRes - Resolution on the z-axis/Longitude
     */
    this.setResolution = function(xRes,zRes){
        this.XResolution = parseInt(xRes);
        this.ZResolution = parseInt(zRes);

        var maxResolution = EarthServerGenericClient.MainScene.getMaxResolution();
        if( this.XResolution > maxResolution )
        {   this.XResolution = maxResolution;   }
        if( this.ZResolution > maxResolution )
        {   this.ZResolution = maxResolution;   }

    };

    /**
     * Sets the position of the scene model within the fishtank/cube. Values between [0-1]
     * @param xOffset - Offset on the x-axis/width  Default:0
     * @param yOffset - Offset on the y-axis/height Default:0
     * @param zOffset - Offset on the z-axis/depth  Default:0
     */
    this.setOffset = function( xOffset, yOffset, zOffset){
        this.xOffset = parseFloat(xOffset);
        this.yOffset = parseFloat(yOffset);
        this.zOffset = parseFloat(zOffset);
    };
    /**
     * Sets the size of the scene model compared to the fishtank/cube. Values between 0 - 1.
     * @param xScale - Size of the model on the x-axis/width  Default:1   (whole cube)
     * @param yScale - Size of the model on the y-axis/height Default:0.3 (30% of the cube)
     * @param zScale - Size of the model on the x-axis/width  Default:1   (whole cube)
     */
    this.setScale = function( xScale, yScale, zScale){
        this.xScale = parseFloat(xScale);
        this.yScale = parseFloat(yScale);
        this.zScale = parseFloat(zScale);
    };

    /**
     * Sets the image format for the server request.
     * @param imageFormat - Default "png".
     */
    this.setImageFormat = function( imageFormat){
        this.imageFormat = String(imageFormat);
    };

    /**
     * Sets the initial transparency of the scene model.
     * The function accepts a parameter value in the range of 0 (fully opaque) and 1(fully transparent).
     * @param transparency - Value of transparency.
     */
    this.setTransparency = function( transparency ){
        this.transparency = parseFloat(transparency);
    };

    /**
     * Sets the specular color for the scene model.
     * @param color - Color in rgb.
     */
    this.setSpecularColor = function( color )
    {
        this.specularColor = color;
    };

    /**
     * Sets the diffuse color for the scene model.
     * @param color - Color in rgb.
     */
    this.setDiffuseColor = function( color )
    {
        this.diffuseColor = color;
    };

    /**
     * Sets if side panels should be added to the model.
     * @param value
     */
    this.setSidePanels = function( value )
    {
        this.sidePanels = value;
    };



    /**
     * Sets the queries for the four side panels' textures.
     * @param links - Array with four image links.
     */
    this.setSidePanelsImageLinks = function( links )
    {
        if( links.length !== 4)
        {
            console.log("EarthServerClient::ModuleBase: Links array for side panels needs exact 4 queries.");
        }
        else
        {
            this.sidePanelsLinks = links;
        }
    };

    /**
     * Updates the transparency during runtime of the scene model.
     * The function accepts a value in the range of 0 (fully opaque) and 1(fully transparent).
     * @param transparency - Value of transparency.
     */
    this.updateTransparency = function( transparency ){
        this.terrain.setTransparency(transparency);
    };

    /**
     * Modules report their loading progress with this function which reports to the main scene.
     */
    this.reportProgress = function()
    {
        // The total progress of this module depends on the number of requests it does.
        // The progress parameter is the progress of ONE request.
        // ReceivedDataCount is the number of already received responses.
        // it is doubled because for each request one terrain will be build.
        var totalProgress = ((this.receivedDataCount) / (this.requests * 2))*100;
        EarthServerGenericClient.MainScene.reportProgress(this.index,totalProgress);
    };

    /**
     * Sets the RGB value to be considered as NODATA in the TEXTURE. All pixels with this RGB value will be drawn transparent.
     * @param red - Value for the red channel.
     * @param green - Value for the green channel.
     * @param blue - Value for the blue channel.
     */
    this.setTextureNoDataValue = function(red,green,blue)
    {
        this.noData = [];
        this.noData[0] = parseInt(red);
        this.noData[1] = parseInt(green);
        this.noData[2] = parseInt(blue);
    };

    /**
     * Sets the DEM value to be considered as NODATA in the DEM. No Faces will be drawn having a vertex with that value.
     * @param value - No data value
     */
    this.setDemNoDataValue = function( value )
    {
        this.demNoData = value;
    };

    /**
     * Returns the noData Value for the DEM or undefined if not set.
     * @returns {float}
     */
    this.getDemNoDataValue = function()
    {
        return this.demNoData;
    };

    /**
     * Replaces all $xx symbols with the value-
     * @param inputString - Input WCPS query string.
     * @returns {String} - String with symbols replaced by values.
     */
    this.replaceSymbolsInString = function(inputString)
    {
        var out;
        out = EarthServerGenericClient.replaceAllFindsInString(inputString,"$CI",this.coverageImage);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$CD",this.coverageDEM);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$CT",this.coverageTime);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$MINX",this.minx);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$MINY",this.miny);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$MAXX",this.maxx);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$MAXY",this.maxy);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$CRS" ,'"' + this.CRS + '"');
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$RESX",this.XResolution);
        // allows users to use either $RESY or $RESZ
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$RESZ",this.ZResolution);
        out = EarthServerGenericClient.replaceAllFindsInString(out,"$RESY",this.ZResolution);

        return out;
    };

    /**
     * sets if no texture shall be used. If true the terrain uses the default or specified color only.
     * @param value
     */
    this.setColorOnly = function(value)
    {
        this.colorOnly = value;
    };

    /**
     * Registers a handler for a specific format for preprocessing data received
     * by a data request.
     * @param mimetype - Received data from the server request.
     * @returns {boolean} - TRUE if a handler for the given format is registered,
     * FALSE if not
     */
    this.registerMIMETypeHandler = function(mimetype, handler)
    {
        if (mimetype != "" && handler) {
            if (!this.mimetypeHandlers) {
                this.mimetypeHandlers = {};
            }
            this.mimetypeHandlers[mimetype] = handler;
        } else {
            alert("'registerMIMETypeHandler' called with wrong arguments!");
            console.log("'registerMIMETypeHandler' called with wrong arguments!");
        }
    };

    /**
     * Preprocesses the received data from the server request to extract the 
     * heightmap data dependent on the response format.
     * @param data - Received data from the server request.
     * @param responseData - Instance of the ServerResponseData which has to be filled.
     * @param mimetype - type to select the corresponding handler.
     * @returns {boolean} - TRUE if a handler for the given format is registered,
     * FALSE if not
     */
    this.preprocessReceivedData = function(data, responseData, mimetype)
    {
        if (!this.mimetypeHandlers) {
            return false;
        }
        
        var mimetypeHandler = this.mimetypeHandlers[mimetype];
        if (!mimetypeHandler) {
            return false;
        } else {
            mimetypeHandler(data, responseData);
        }

        return true;
    };

    /**
     * Validates the received data from the server request.
     * Checks if a texture and a heightmap are available at the moment.
     * @param data - Received data from the server request.
     * @returns {boolean} - TRUE if OK, FALSE if some data is missing
     */
    this.checkReceivedData = function(data)
    {
        this.receivedDataCount++;
        this.reportProgress();

        // No texture whished?
        if( this.colorOnly && data !== null && data !== undefined)
        {
            data.validateTexture = false; // disable check for texture
            data.texture = undefined;
        }

        if( data === null || !data.validate() )
        {
            alert(this.name +": Request not successful.");
            console.log(data);
            this.reportProgress();//NO Terrain will be built so report the progress here
            this.removePlaceHolder();//Remove the placeHolder.

            //delete UI elements
            var header = document.getElementById("EarthServerGenericClient_ModelHeader_"+this.index);
            var div = document.getElementById("EarthServerGenericClient_ModelDiv_"+this.index);

            if(header && div)
            {
                var parent = div.parentNode;

                if(parent)
                {
                    parent.removeChild(div);
                    parent.removeChild(header);
                }
            }
            return false;
        }

        // add module specific values
        data.transparency =  this.transparency;
        data.specularColor = this.specularColor || EarthServerGenericClient.MainScene.getDefaultSpecularColor();
        data.diffuseColor = this.diffuseColor || EarthServerGenericClient.MainScene.getDefaultDiffuseColor();

        return true;
    };

    /**
     * Adds an Object that will be informed about movements and alterations of the model.
     * @param bindingObject - Object that will receive the notification.
     */
    this.addBinding = function(bindingObject)
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            if(this.bindings[i] == bindingObject)
            {
                console.log(this.name + "::addBinding: Object already registered.");
                return;
            }
        }
        this.bindings.push(bindingObject);
        bindingObject.setBoundModuleIndex(this.index);
    };

    /**
     * Removes an Object that will be informed about movements and alterations of the model.
     * @param bindingObject - Object that will no longer receive the notification.
     */
    this.removeBinding = function(bindingObject)
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            if( this.bindings[i] === bindingObject)
            {
                this.bindings[i].releaseBinding();
                this.bindings = EarthServerGenericClient.arrayRemove(this.bindings,i,i);
                return;
            }
        }
    };

    /**
     * This function is called if the model is moved in the scene.
     * All bindings will also get the movement update.
     * @param movementType - Type of the movement: xAxis,zAxis,elevation...
     * @param value - Updated position
     */
    this.movementUpdateBindings = function(movementType,value)
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            this.bindings[i].movementUpdateBoundModule(movementType,value);
        }
    };

    /**
     * This function calls every binding object that the elevation of the models was changed.
     * @param value - This is the value the that was given to SceneManager::updateElevation().
     */
    this.elevationUpdateBinding = function(value)
    {
        if(value === undefined)
        {   value = 10; }//TODO DEFINE some basic start values for UI etc.

        for(var i=0; i<this.bindings.length;i++)
        {
            this.bindings[i].elevationUpdateBoundModule(value);
        }
    };

    /**
     * Returns the elevation value of it's terrain at a specific point in the 3D scene.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height on the y-axis.
     */
    this.getHeightAt3DPosition = function(xPos,zPos)
    {
        if( this.terrain)
        {
            return this.terrain.getHeightAt3DPosition(xPos,zPos);
        }
        else
        {   return 0; }
    };

    /**
     * Returns the dem value of it's terrain at a specific point in the 3D scene.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height of the dem.
     */
    this.getDemValueAt3DPosition = function(xPos,zPos)
    {
        if( this.terrain)
        {
            return this.terrain.getDemValueAt3DPosition(xPos,zPos);
        }
        else
        {   return 0; }
    };

    /**
     * This creates a placeholder Element for the model. It consists of an simple quad.
     * Models that use this placeholder should remove it of course.
     */
    this.createPlaceHolder = function()
    {
        var appearance = document.createElement('Appearance');
        var material = document.createElement('Material');
        material.setAttribute("emissiveColor","0.4 0.4 0.4");

        var trans = document.createElement('Transform');
        var yoff = (this.cubeSizeY * this.yOffset);
        trans.setAttribute("translation", "0 "+ yoff  + " 0");

        var shape = document.createElement('shape');
        var triangleset = document.createElement('IndexedFaceSet');
        triangleset.setAttribute("colorPerVertex", "false");
        triangleset.setAttribute("coordindex","0 1 2 3 -1");

        var coords = document.createElement('Coordinate');

        var cubeX = this.cubeSizeX/2.0;
        var cubeZ = this.cubeSizeZ/2.0;
        var cubeXNeg = -this.cubeSizeX/2.0;
        var cubeYNeg = -this.cubeSizeY/2.0;
        var cubeZNeg = -this.cubeSizeZ/2.0;

        var p = {};
        p[0] = ""+ cubeXNeg + " " + cubeYNeg + " " + cubeZNeg + " ";
        p[1] = ""+ cubeXNeg + " " + cubeYNeg + " " + cubeZ + " ";
        p[2] = ""+ cubeX    + " " + cubeYNeg + " " + cubeZ    + " ";
        p[3] = ""+ cubeX    + " " + cubeYNeg + " " + cubeZNeg;

        var points="";
        for(var i=0; i<4;i++)
        {   points = points+p[i];   }
        coords.setAttribute("point", points);

        triangleset.appendChild(coords);
        appearance.appendChild(material);
        shape.appendChild(appearance);
        shape.appendChild(triangleset);
        trans.appendChild(shape);

        this.placeHolder = trans;
        this.root.appendChild( this.placeHolder );

        appearance = null;
        material = null;
        shape = null;
        triangleset = null;
        coords = null;
        points = null;
        trans = null;
    };

    /**
     * Removes the PlaceHolder created in createPlaceHolder(). If already deleted nothing happens.
     */
    this.removePlaceHolder = function()
    {
        if( this.placeHolder !== null && this.placeHolder !== undefined )
        {
            this.root.removeChild( this.placeHolder);
            this.placeHolder = null;
        }
    };

    /**
     * Creates the transform for the scene model to fit into the fishtank/cube. This is done automatically by
     * the scene model.
     * @param xRes - Size of the received data on the x-axis (e.g. the requested DEM )
     * @param yRes - Size of the received data on the y-axis
     * @param zRes - Size of the received data on the z-axis
     * @param minHeightvalue - Minimum Value along the y-axis (e.g. minimum value in a DEM, so the model starts at it's wished location)
     * @param minXvalue - Minimum Value along the x-axis
     * @param minZvalue - Minimum Value along the z-axis
     * @return {Element}
     */
    this.createTransform = function(xRes,yRes,zRes,minHeightvalue,minXvalue,minZvalue){
        var trans = document.createElement('Transform');
        trans.setAttribute("id", "EarthServerGenericClient_modelTransform"+this.index);
        trans.setAttribute("onclick","EarthServerGenericClient.MainScene.OnClickFunction("+this.index+",event.hitPnt);");

        this.YResolution = yRes;
        this.minValue = minHeightvalue;

        if(zRes<1) zRes = 2;

       // var scaleX = (this.cubeSizeX*this.xScale)/(Math.ceil(xRes)-1);
        var scaleX = (this.cubeSizeX*this.xScale)/(xRes-1);
        var scaleY = (this.cubeSizeY*this.yScale)/this.YResolution;
        //var scaleZ = (this.cubeSizeZ*this.zScale)/(Math.ceil(zRes)-1);
        var scaleZ = (this.cubeSizeZ*this.zScale)/(zRes-1);
        trans.setAttribute("scale", "" + scaleX + " " + scaleY + " " + scaleZ);

        var xoff = (this.cubeSizeX * this.xOffset) - (this.cubeSizeX/2.0) - (scaleX * minXvalue);
        var yoff = (this.cubeSizeY * this.yOffset) - (minHeightvalue*scaleY) - (this.cubeSizeY/2.0);
        var zoff = (this.cubeSizeZ * this.zOffset) - (this.cubeSizeZ/2.0) - (scaleZ * minZvalue);
        trans.setAttribute("translation", "" + xoff+ " " + yoff  + " " + zoff);

        return trans;
    };

    /**
     * Updates the translation on the y-axis after the elevation was updated
     * so the model will stay in place.
     * @param newScale - The new scale value for the y-axis.
     */
    this.updateTranslationForElevation = function(newScale)
    {
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+this.index);

        if(trans)
        {
            var yoff = (this.cubeSizeY * this.yOffset) - ( this.minValue*newScale) - (this.cubeSizeY/2.0);
            var translation = trans.getAttribute("translation");
            var values = translation.split(" ");

            trans.setAttribute("translation", "" + values[0]+ " " + yoff  + " " + values[2]);
        }
        else
        {   console.log("EarthServerGenericClient::Module::updateTranslationForElevation " + this.index + ": Can't find transform.");    }

    };

    /**
     * Sets the default values. This is done automatically by the scene model.
     */
    this.setDefaults = function(){
        /**
         * Name of the model. This will be display in the UI.
         * @default Name is given by the module
         * @type {String}
         */
        this.name = "No name given";

        /**
         * All objects that are bound to the module. The will be noticed if the models is moved or altered.
         * Example: Annotation layers should be moved with the module and change the height when the elevation changes.
         * @type {Array}
         */
        this.bindings = [];

        /**
         * Resolution for the latitude.
         * @default 500
         * @type {Number}
         */
        this.XResolution = 500;

        /**
         * Resolution for the longitude
         * @default 500
         * @type {Number}
         */
        this.ZResolution = 500;

        /**
         * Offset on the X-Axis for the model.
         * @default 0
         * @type {Number}
         */
        this.xOffset = 0;

        /**
         * Offset on the Y-Axis for the model.
         * @default 0
         * @type {Number}
         */
        this.yOffset = 0;

        /**
         * Offset on the Z-Axis for the model.
         * @default 0
         * @type {Number}
         */
        this.zOffset = 0;

        /**
         * The models dimension compared to the whole cube on the X-Axis.
         * @default 1
         * @type {Number}
         */
        this.xScale = 1;

        /**
         * The models dimension compared to the whole cube on the Y-Axis.
         * @default 0.3
         * @type {Number}
         */
        this.yScale = 0.3;

        /**
         * The models dimension compared to the whole cube on the Z-Axis.
         * @default 1
         * @type {Number}
         */
        this.zScale = 1;

        /**
         * The used Image format (if one is used)
         * @default "png"
         * @type {String}
         */
        this.imageFormat = "png";

        /**
         * The amount of requests the model do. It is needed to keep track of the loading progress.
         * @default 1
         * @type {number}
         */
        this.requests = 1;

        /**
         * The amount of already received responses. Along with requests this is used to keep track of the loading progress.
         * @default 0
         * @type {number}
         */
        this.receivedDataCount = 0;

        /**
         * The Transparency of the model.
         * @default 0
         * @type {Number}
         */
        this.transparency = 0;

        /**
         * Flag if side panels should be added to the terrain.
         * @default false
         * @type {boolean}
         */
        this.sidePanels = false;

        /**
         * Flag if no texture shall be used. If true the terrain uses the default or specified color only.
         * @default false
         * @type {boolean}
         */
        this.colorOnly = false;

        /**
         * Terrain of the module.
         */
        this.terrain = null;

        /**
         * Index aka. ID of the module.#
         * @type {Number}
         */
        this.index = -1;
    };
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: Layer and Time. TODO: Add better description
 * 1 URL for the service, 1 Coverage name data.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_LayerAndTime = function()
{
    this.setDefaults();
    this.name = "Coverage with layers and time.";
   
    /**
     * The custom or default WCPS Queries.
     * @type {Array}
     */
    this.WCPSQuery  = [];
    /**
     * Data modifier for the data query. Should be a number as a string.
     * @default: Empty String
     * @type {string}
     */
    this.dataModifier = "";
};
EarthServerGenericClient.Model_LayerAndTime.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );

/**
 * Sets the URL for the service.
 * @param url
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setURL=function(url){
    /**
     * URL for the WCPS service.
     * @type {String}
     */
    this.URLWCPS = String(url);
};
/**
 * Sets the coverage name.
 * @param coverageLayer - Coverage name for the layered data set.
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setCoverage = function (coverageLayer) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageLayer = String(coverageLayer);
};
/**
 * Sets the queried layers. E.g. 1:3
 * @param Layers
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setLayers = function (Layers) {
    /**
     * Queried Layers.
     * @type {String}
     */
    this.queriedLayers = [];

    var tmpLayers = String(Layers);
    tmpLayers = tmpLayers.split(":");

    if( tmpLayers.length === 1)
    {   this.queriedLayers = tmpLayers; }
    else
    {
        for(var i=parseInt(tmpLayers[0]);i<=parseInt(tmpLayers[1]);i++)
        {   this.queriedLayers.push(i);  }
    }

    this.requests = this.queriedLayers.length;
};
/**
 * Sets the coverage time.
 * @param coverageTime
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setCoverageTime = function (coverageTime) {
    /**
     *
     * @type {String}
     */
    this.coverageTime = String(coverageTime);
};

/**
 * Sets the data modifier to be multiplied with the data. Eg: 10000
 * @param modifier
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setDataModifier = function( modifier )
{
    this.dataModifier = String(modifier) + "*";
};

/**
 * Sets a specific querystring for the data query.
 * @param queryString - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setWCPSForChannelALPHA = function(queryString)
{
    this.WCPSQuery = queryString;
};

/**
 * Sets the Coordinate Reference System.
 * @param value - eg. "http://www.opengis.net/def/crs/EPSG/0/27700"
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setCoordinateReferenceSystem = function(value)
{
    this.CRS = value;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    // Check if mandatory values are set
    if( this.coverageLayer === undefined || this.URLWCPS === undefined ||
        this.coverageTime === undefined || this.queriedLayers === undefined  )
    {
        alert("Not all mandatory values are set. LayerAndTime: " + this.name );
        console.log(this);
        return;
    }

    //IF something is not defined use standard query.
    if( this.WCPSQuery.length === 0 )
    {
        for(var i=0; i< this.queriedLayers.length;i++)
        {
            this.WCPSQuery[i]  = "for data in (" + this.coverageLayer +")";
            this.WCPSQuery[i] += "return encode(("+ this.dataModifier +"data[t(" + this.coverageTime +"),";
            this.WCPSQuery[i] += 'd4('+ this.queriedLayers[i]+ ')]),"png")';
        }
    }
    else //ALL set so use custom query
    {
        this.replaceSymbolsInString(this.WCPSQuery);
    }

    // request data
    EarthServerGenericClient.requestWCPSImages(this,this.URLWCPS,this.WCPSQuery);
};
/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data array(!) from the ServerRequest.
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.receiveData = function( data)
{
    var failedData = 0;
    for(var i=0;i<data.length;i++)
    {
        // TODO: delete only the one element and UI only if all failed.
        if( !this.checkReceivedData( data[i] ) )
            failedData++;
    }

    // if all data failed return
    if( failedData == data.length) return;

    // create transform
    this.transformNode = this.createTransform(2,this.queriedLayers.length,2,0);
    this.root.appendChild(this.transformNode);

    // create terrain
    EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
    this.terrain = new EarthServerGenericClient.VolumeTerrain(this.transformNode,data,this.index,this.noDataValue);
    EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);

};

EarthServerGenericClient.Model_LayerAndTime.prototype.updateMaxShownElements = function(value)
{
    if( this.terrain !== undefined )
        this.terrain.updateMaxShownElements(value);
};

/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_LayerAndTime.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendMaxShownElementsSlider(element,this.index,this.requests);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: Module for underground data.
 * One service URL, one coverage
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Module_Sharad = function()
{
    this.setDefaults();
    this.boundModelIndex = -1; // sharad modules can be bound to other modules. -1: unbound
    this.name = "Sharad Underground";
};
EarthServerGenericClient.Module_Sharad.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );


EarthServerGenericClient.Module_Sharad.prototype.setURL=function(serviceURL)
{
    this.serviceURL = serviceURL;
};


EarthServerGenericClient.Module_Sharad.prototype.setCoverages = function (coverage)
{
    this.coverage = coverage;
};

/**
 * Sets a complete custom querystring.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Module_Sharad.prototype.setWCPSQuery = function(querystring)
{
    /**
     * The custom query.
     * @type {String}
     */
    this.WCPSQuery = String(querystring);
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Module_Sharad.prototype.createModel=function(root,cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
    {   alert("root is not defined");    }

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.serviceURL === undefined || this.coverage === undefined || this.WCPSQuery === undefined )
    {
        alert("Not all mandatory values are set. Sharad: " + this.name );
        console.log(this);
        return;
    }

    //Replace $ symbols with the actual values
    this.WCPSQuery = this.WCPSQuery.replace("$CI",this.coverage);
    this.WCPSQuery = this.WCPSQuery.replace("$MINX",this.minx);
    this.WCPSQuery = this.WCPSQuery.replace("$MINY",this.miny);
    this.WCPSQuery = this.WCPSQuery.replace("$MAXX",this.maxx);
    this.WCPSQuery = this.WCPSQuery.replace("$MAXY",this.maxy);
    this.WCPSQuery = this.WCPSQuery.replace("$CRS" ,'"' + this.CRS + '"');
    this.WCPSQuery = this.WCPSQuery.replace("$CRS" ,'"' + this.CRS + '"');
    this.WCPSQuery = this.WCPSQuery.replace("$RESX",this.XResolution);
    this.WCPSQuery = this.WCPSQuery.replace("$RESZ",this.ZResolution);

    //2: Make ServerRequest
    EarthServerGenericClient.requestWCPSImage(this,this.serviceURL,this.WCPSQuery);
};

EarthServerGenericClient.Module_Sharad.prototype.setMetaData = function( link )
{

    function getBinary(file)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, false);
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.send(null);
        return xhr.responseText;
    }

    var descov = getBinary(link);

    if(descov)
    {
        descov = descov.match(/gmlcov:metadata>(.+)<\/gmlcov:metadata/);
        if(descov !== null)
        {
            descov = descov[0];
            descov = descov.replace('coords','"coords"');
            descov = '' + descov.substring(16,descov.length - 18);
            var metadata = JSON.parse(descov);

            if( metadata.coords.length > 0)
            {   this.coords = metadata.coords; }
        }
        else
        {
            console.log("EarthServerGenericClient::Module_Sharad: Error in meta data response.") ;
        }
    }
    else
    {
        console.log("EarthServerGenericClient::Module_Sharad: Can't access meta data.") ;
    }
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Module_Sharad.prototype.receiveData = function(data)
{
    if( this.checkReceivedData(data))
    {
        // Remove the placeHolder
        this.removePlaceHolder();

        // This modules creates it's own transformation.
        var trans = document.createElement('Transform');
        trans.setAttribute("id", "EarthServerGenericClient_modelTransform"+this.index);

        if(this.coords === undefined)
        {
            var width = Math.pow(2, Math.round(Math.log(data.texture.width)/Math.log(2)));
            var height = Math.pow(2, Math.round(Math.log(data.texture.height)/Math.log(2)));

            if( width  > x3dom.caps.MAX_TEXTURE_SIZE) width  = x3dom.caps.MAX_TEXTURE_SIZE;
            if( height > x3dom.caps.MAX_TEXTURE_SIZE) height = x3dom.caps.MAX_TEXTURE_SIZE;

            this.YResolution = 1000;

            var scaleX = (this.cubeSizeX*this.xScale)/(parseInt(width)-1);
            var scaleY = (this.cubeSizeY*this.yScale)/1000;
            var scaleZ = (this.cubeSizeY*this.yScale)/(parseInt(height)-1);

            trans.setAttribute("scale", "" + scaleX + " " + scaleY + " " + scaleZ);

            var xoff = (this.cubeSizeX * this.xOffset) - (this.cubeSizeX/2.0);
            var yoff = (this.cubeSizeY * this.yOffset) + (height*scaleY) - (this.cubeSizeY/2.0);
            var zoff = (this.cubeSizeZ * this.zOffset) - (this.cubeSizeZ/2.0);
            trans.setAttribute("translation", "" + xoff+ " " + yoff  + " " + zoff);

            // turn upright
            trans.setAttribute("rotation","1 0 0 1.57");
        }
        else
        {
            height = Math.pow(2, Math.round(Math.log(data.texture.height)/Math.log(2)));
            if( height > x3dom.caps.MAX_TEXTURE_SIZE) height = x3dom.caps.MAX_TEXTURE_SIZE;

            scaleY = (this.cubeSizeY*this.yScale)/height;
            trans.setAttribute("scale", "1 " + scaleY + " 1");

            this.YResolution = height;

            var min = (-this.cubeSizeY/2.0) + EarthServerGenericClient.MainScene.getModelOffsetY(this.index) * this.cubeSizeY;
            yoff = (this.cubeSizeY * this.yOffset) - (min*scaleY) - (this.cubeSizeY/2.0);
            trans.setAttribute("translation", "0 " + yoff  + " 0");
        }


        this.root.appendChild( trans);

        // Create terrain
        var area = {};
        area.minx = this.minx;
        area.miny = this.miny;
        area.maxx = this.maxx;
        area.maxy = this.maxy;
        this.terrain = new EarthServerGenericClient.SharadTerrain(trans, data, this.index,this.noData,this.coords,area);
        this.terrain.createTerrain();
    }
};

/**
 * Sets the index of the scene model the sharad module is bound to.
 * @param index - Index of the scene model.
 */
EarthServerGenericClient.Module_Sharad.prototype.setBoundModuleIndex = function(index)
{
    if(index === this.index)//prevent to bind this module to itself
    {
        console.log("Module_Sharad: Can't bind module to itself.");
    }
    else
    {
        console.log("Module_Sharad: Bound to model: " + index);
        this.boundModelIndex = index;
    }
};

/**
 * Returns the index of the model sharad module is bound to.
 * @returns {number} - Index of the model or -1 if unbound.
 */
EarthServerGenericClient.Module_Sharad.prototype.getBoundModuleIndex = function()
{
    return this.boundModelIndex;
};

/**
 * Resets the modelIndex sharad module is bound to back to -1 and marks it as unbound.
 */
EarthServerGenericClient.Module_Sharad.prototype.releaseBinding = function()
{
    this.boundModelIndex = -1;
};

/**
 * If sharad module is bound to another module the sharad module shall move when the other module is moved.
 * This function shall receive the delta of the positions every time the module is moved.
 * @param axis - Axis of the movement.
 * @param delta - Delta to the last position.
 */
EarthServerGenericClient.Module_Sharad.prototype.movementUpdateBoundModule = function(axis,delta)
{
   EarthServerGenericClient.MainScene.updateOffsetByDelta(this.index,axis,delta);
};

/**
 * This function notifies sharad module that the bound module's elevation was changed.
 * All annotation will be checked and altered in their position.
 */
EarthServerGenericClient.Module_Sharad.prototype.elevationUpdateBoundModule = function(value)
{
    if(this.boundModelIndex >= 0)
    {
        var x = 0;
        var z = 0;

        // call elevation update to it self
        EarthServerGenericClient.MainScene.updateElevation(this.index,value);
        // get height of the bound module. (for now at the center of the cube
        var value = EarthServerGenericClient.MainScene.getHeightAt3DPosition(this.boundModelIndex,x,z);
        console.log(value);
        // get own transformation by name "EarthServerGenericClient_modelTransform"+this.index);
        var trans = document.getElementById("EarthServerGenericClient_modelTransform"+this.index);
        if( trans)
        {
            var scale = trans.getAttribute("scale");
            scale = scale.split(" ");
            // determine exact value
            value = value + (this.cubeSizeY/2) - ( this.YResolution * scale[1] * this.yScale );
            //update offset
            EarthServerGenericClient.MainScene.updateOffset(this.index,1,value);
        }
        else
        {   console.log("EarthServerClient::Module_Sharad not able to find transform.");    }

        trans = null;
    }
    else
    {   console.log("EarthServerClient::Module_Sharad not bound to a model.");  }
};



/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model
 */
EarthServerGenericClient.Module_Sharad.prototype.setSpecificElement= function(element)
{
    // updateLength() is called for elevation because the model is rotated. Scaling it's length
    // scales the size on the y-axis in fact.
    if(this.coords === undefined)
    {
        EarthServerGenericClient.appendGenericSlider(element,"EarthServerGenericClient_Slider_E_"+this.index,"Elevation",
                                                this.index,0,100,10,EarthServerGenericClient.MainScene.updateLength);
    }
    else//normal elevation
    {   EarthServerGenericClient.appendElevationSlider(element,this.index); }
};

//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @ignore <-- REMOVE ME FOR DOCUMENTATION
 * @class Scene Model: <Add Description>
 * <amount of service urls + coverages>
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_Name = function()
{
    this.setDefaults();
    this.name = "Some Name";

    //Initialise variables her
    //this.var = 0;
};
EarthServerGenericClient.Model_Name.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );

//A function for URL(s)
//EarthServerGenericClient.Model_Name.prototype.setURLs=function(URL1,..)

//A function for Coverage(s)
//EarthServerGenericClient.Model_Name.prototype.setCoverages = function (coverage1, ...)

//A function for Version(s)
//EarthServerGenericClient.Model_Name.prototype.setxxxVersion = function (version)

//Any additional functions
//EarthServerGenericClient.Model_Name.prototype.functionName = function(parameters)

/**
 * @ignore <-- REMOVE ME FOR DOCUMENTATION
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_Name.prototype.createModel=function(root,cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    /*if( this.var === undefined || ....)
    {
        alert("Not all mandatory values are set. ModuleDescription: " + this.name );
        console.log(this);
        return;
    }*/

    //2: Make ServerRequest
    /* Exmaple:
    EarthServerGenericClient.requestWMSImageWCSDem(this,bb,this.XResolution,this.ZResolution,
        this.URLWMS,this.coverageImage,this.WMSVersion,this.CRS,this.imageFormat,
        this.URLDEM,this.coverageDEM,this.WCSVersion);
        */
};

/**
 * @ignore <-- REMOVE ME FOR DOCUMENTATION
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_Name.prototype.receiveData= function( data)
{
    if( this.checkReceivedData(data))
    {
        //Remove the placeHolder
        this.removePlaceHolder();

        var YResolution = (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        var transform = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue));
        this.root.appendChild( transform);

        //Set transparency
        data.transparency = this.transparency;

        //Create Terrain out of the received data
        //Example LOD Terrain
        //this.terrain = new EarthServerGenericClient.LODTerrain(transform, data, this.index);
        //this.terrain.createTerrain();

    }
};


/**
 * @ignore <-- REMOVE ME FOR DOCUMENTATION
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model
 */
EarthServerGenericClient.Model_Name.prototype.setSpecificElement= function(element)
{
    //Example:
    //EarthServerGenericClient.appendElevationSlider(element,this.index);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WCPS Image with DEM from second WCPS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WCPSDemWCPS = function()
{
    this.setDefaults();
    this.name = "WCPS Image with DEM from second WCPS Query.";
};
EarthServerGenericClient.Model_WCPSDemWCPS.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );
/**
 * Sets the urls for both WCPS Queries. If only one url is given it is used for both requests.
 * @param imageURL - Service URL for the WCPS Image Request
 * @param demURL - Service URL for the WCPS Dem Request
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.setURLs=function(imageURL, demURL){
    /**
     * URL for the WCPS image service.
     * @type {String}
     */
    this.imageURL = String(imageURL);
    /**
     * URL for the WCPS Dem service.
     * @type {String}
     */
    this.demURL;
    if(demURL === undefined) // if demURL is not defined use imageURL
    {   this.demURL = String(imageURL); }
    else
    {   this.demURL  = String(demURL);  }
};
/**
 * Sets both coveragenames
 * @param coverageImage - Coverage name for the image dataset.
 * @param coverageDem   - Coverage name for the dem dataset.
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.setCoverages = function (coverageImage, coverageDem) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageImage = String(coverageImage);
    /**
     * Name if the dem coverage.
     * @type {String}
     */
    this.coverageDEM = String(coverageDem);
};
/**
 * Sets a complete custom querystring.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.setWCPSImageQuery = function(querystring)
{
    /**
     * The custom WCPS image query.
     * @type {String}
     */
    this.WCPSImageQuery = String(querystring);
};

/**
 * Sets a custom query for the WCPS Dem request.
 * @param querystring - WCPS as a string.
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.setWCPSDemQuery = function(querystring)
{
    /**
     * The custom WCPS Dem query.
     * @type {String}
     */
    this.WCPSDemQuery = String(querystring);
};


/**
 * Sets the Coordinate Reference System.
 * @param value - eg. "http://www.opengis.net/def/crs/EPSG/0/27700"
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.setCoordinateReferenceSystem = function(value)
{
    this.CRS = value;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.coverageImage === undefined || this.coverageDEM === undefined || this.imageURL === undefined || this.demURL === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined || this.CRS === undefined )
    {
        alert("Not all mandatory values are set. WCPSDemWCPS: " + this.name );
        console.log(this);
        return;
    }

    //2: create wcps queries
    //If no query was defined use standard query.
    if( this.WCPSImageQuery === undefined)
    {
        this.WCPSImageQuery =  "for i in (" + this.coverageImage + ") return encode ( { ";
        this.WCPSImageQuery += 'red: scale(trim(i.red, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + this.XResolution + '), y:"CRS:1"(0:' + this.ZResolution + ")}, {}); ";
        this.WCPSImageQuery += 'green: scale(trim(i.green, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + this.XResolution + '), y:"CRS:1"(0:' + this.ZResolution + ")}, {}); ";
        this.WCPSImageQuery += 'blue: scale(trim(i.blue, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + this.XResolution + '), y:"CRS:1"(0:' + this.ZResolution + ")}, {})";
        this.WCPSImageQuery += '}, "' + this.imageFormat +'" )';
    }
    else //A custom query was defined so use it
    {
        //Replace $ symbols with the actual values
        this.WCPSImageQuery = this.replaceSymbolsInString(this.WCPSImageQuery);
    }

    if( this.WCPSDemQuery === undefined)
    {
        var currentXRes = this.XResolution;
        var currentZRes = this.ZResolution;
        this.WCPSDemQuery =  "for dtm in (" + this.coverageDEM + ") return encode (";
        this.WCPSDemQuery += 'scale(trim(dtm , {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + currentXRes + '), y:"CRS:1"(0:' + currentZRes + ")}, {})";
        this.WCPSDemQuery += ', "csv" )';
    }
    else //A custom query was defined so use it
    {
        //Replace $ symbols with the actual values
        this.WCPSDemQuery = this.replaceSymbolsInString(this.WCPSDemQuery);
    }

    EarthServerGenericClient.requestWCPSImageWCPSDem(this,this.imageURL,this.WCPSImageQuery,this.demURL,this.WCPSDemQuery);
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.receiveData= function( data)
{
    if( this.checkReceivedData(data))
    {
        //Remove the placeHolder
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        var transform = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue),data.minXvalue,data.minZvalue);
        this.root.appendChild( transform);

        //Create Terrain out of the received data
        EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
        this.terrain = new EarthServerGenericClient.LODTerrain(transform, data, this.index, this.noData, this.demNoData);
        this.terrain.createTerrain();
        EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
        this.elevationUpdateBinding(); // notify all bindings about the terrain elevation update

        if(this.sidePanels)
        {   this.terrain.createSidePanels(transform,1); }

        EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);

        transform = null;
    }
};


/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WCPSDemWCPS.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendElevationSlider(element,this.index);
};

//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WCPS Image with DEM in Alpha Channel
 * 1 URL for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WCPSDemAlpha = function()
{
    this.setDefaults();
    this.name = "WCPS Image with DEM in alpha channel.";
    /**
     * Determines if progressive or complete loading of the model is used.
     * @default false
     * @type {Boolean}
     */
    this.progressiveLoading = false;

    /**
     * The custom or default WCPS Queries. The array contains either one element for complete loading
     * or multiple (3) queries for progressive loading of the model.
     * @type {Array}
     */
    this.WCPSQuery  = [];
};
EarthServerGenericClient.Model_WCPSDemAlpha.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );
/**
 * Enables/Disables the progressive loading of the model.
 * @param value - True or False
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setProgressiveLoading=function(value){
    this.progressiveLoading = value;

    //Progressive Loading creates 3 requests while normal loading 1
    if( this.progressiveLoading){ this.requests = 3; }
    else{   this.requests = 1;  }
};
/**
 * Sets the URL for the service.
 * @param url
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setURL=function(url){
    /**
     * URL for the WCPS service.
     * @type {String}
     */
    this.URLWCPS = String(url);
};
/**
 * Sets both coverage names.
 * @param coverageImage - Coverage name for the image data set.
 * @param coverageDem   - Coverage name for the dem data set.
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setCoverages = function (coverageImage, coverageDem) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageImage = String(coverageImage);
    /**
     * name of the dem coverage.
     * @type {String}
     */
    this.coverageDEM = String(coverageDem);
};
/**
 * Sets a specific querystring for the RED channel of the WCPS query.
 * All red,blue,green and alpha has to be set, otherwise the standard query will be used.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setWCPSForChannelRED = function(querystring)
{
    this.WCPSQuery[0] = querystring;
};
/**
 * Sets a specific querystring for the GREEN channel of the WCPS query.
 * All red,blue,green and alpha has to be set, otherwise the standard query will be used.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setWCPSForChannelGREEN = function(querystring)
{
    this.WCPSQuery[1] = querystring;
};
/**
 * Sets a specific querystring for the BLUE channel of the WCPS query.
 * All red,blue,green and alpha has to be set, otherwise the standard query will be used.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setWCPSForChannelBLUE = function(querystring)
{
    this.WCPSQuery[2] = querystring;
};
/**
 * Sets a specific querystring for the ALPHA channel of the WCPS query.
 * All red,blue,green and alpha has to be set, otherwise the standard query will be used.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setWCPSForChannelALPHA = function(querystring)
{
    this.WCPSQuery[3] = querystring;
};

/**
 * Sets the Coordinate Reference System.
 * @param value - eg. "http://www.opengis.net/def/crs/EPSG/0/27700"
*/
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setCoordinateReferenceSystem = function(value)
{
    this.CRS = value;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.coverageImage === undefined || this.coverageDEM === undefined || this.URLWCPS === undefined || this.CRS === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined )
    {
        alert("Not all mandatory values are set. WCPSDemAlpha: " + this.name );
        console.log(this);
        return;
    }

    //2: create wcps query/queries
    //Either the user query if all query strings are set. Or standard wcps query if wcps channels are not set.
    //Build one query for complete loading and multiple queries for progressive loading

    //IF something is not defined use standard query.
    if( this.WCPSQuery[0] === undefined || this.WCPSQuery[1] === undefined || this.WCPSQuery[2] === undefined || this.WCPSQuery[3] === undefined)
    {
        for(var i=0; i<this.requests; i++)
        {
            var currentXRes = parseInt(this.XResolution / Math.pow(2,i) );
            var currentZRes = parseInt(this.ZResolution / Math.pow(2,i) );
            this.WCPSQuery[i] =  "for i in (" + this.coverageImage + "), dtm in (" + this.coverageDEM + ") return encode ( { ";
            this.WCPSQuery[i] += 'red: scale(trim(i.red, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + currentXRes + '), y:"CRS:1"(0:' + currentZRes + ")}, {}); ";
            this.WCPSQuery[i] += 'green: scale(trim(i.green, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + currentXRes + '), y:"CRS:1"(0:' + currentZRes + ")}, {}); ";
            this.WCPSQuery[i] += 'blue: scale(trim(i.blue, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + currentXRes + '), y:"CRS:1"(0:' + currentZRes + ")}, {});";
            this.WCPSQuery[i] += 'alpha: (char) (((scale(trim(dtm , {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + currentXRes + '), y:"CRS:1"(0:' + currentZRes + ")}, {})) / 1349) * 255)";
            this.WCPSQuery[i] += '}, "' + this.imageFormat +'" )';
        }
    }
    else //ALL set so use custom query
    {
        //Create multiple queries if progressive loading is set or one if not.
        for(var j=0; j<this.requests; j++)
        {
            //Replace $ symbols with the actual values
            var tmpString = [];
            for(i=0; i<4; i++)
            {
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(this.WCPSQuery[i],"$CI","image");
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$CD","dtm");
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$MINX",this.minx);
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$MINY",this.miny);
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$MAXX",this.maxx);
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$MAXY",this.maxy);
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$CRS" ,'"' + this.CRS + '"');
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$RESX",parseInt(this.XResolution / Math.pow(2,j) ) );
                tmpString[i] = EarthServerGenericClient.replaceAllFindsInString(tmpString[i],"$RESZ",parseInt(this.ZResolution / Math.pow(2,j) ) );
            }
            this.WCPSQuery[j] =  "for image in (" + this.coverageImage + "), dtm in (" + this.coverageDEM + ") return encode ( { ";
            this.WCPSQuery[j] += "red: " + tmpString[0] + " ";
            this.WCPSQuery[j] += "green: " + tmpString[1]+ " ";
            this.WCPSQuery[j] += "blue: " + tmpString[2] + " ";
            this.WCPSQuery[j] += "alpha: " + tmpString[3];
            this.WCPSQuery[j] += '}, "' + this.imageFormat +'" )';
        }
    }

    //3: Make ServerRequest and receive data.
    if( !this.progressiveLoading)
    {   EarthServerGenericClient.requestWCPSImageAlphaDem(this,this.URLWCPS,this.WCPSQuery[0]);  }
    else
    {   EarthServerGenericClient.progressiveWCPSImageLoader(this,this.URLWCPS,this.WCPSQuery,true);   }
};
/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.receiveData = function( data)
{
    if( this.checkReceivedData(data))
    {
        //If progressive loading is enabled this function is called multiple times.
        //The lower resolution version shall be removed and replaced with the new one.
        //So the old transformNode will be removed and a new one created.
        if(this.transformNode !== undefined )
        {   this.root.removeChild(this.transformNode); }

        //In the first receiveData call remove the placeholder.
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        this.transformNode = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue),data.minXvalue,data.minZvalue);
        this.root.appendChild(this.transformNode);

        //Create Terrain out of the received data
        if( !this.progressiveLoading)
        {
            EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
            this.terrain = new EarthServerGenericClient.LODTerrain(this.transformNode, data, this.index, this.noData, this.demNoData);
            this.terrain.createTerrain();
            EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
            this.elevationUpdateBinding();
            if(this.sidePanels)
            {   this.terrain.createSidePanels(this.transformNode,1);    }
            EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);
        }
        else
        {
            //Check if terrain is already created. Create it in the first function call.
            if( this.terrain === undefined )
            {   this.terrain = new EarthServerGenericClient.ProgressiveTerrain(this.index); }

            //Add new data (with higher resolution) to the terrain
            EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
            this.terrain.insertLevel(this.transformNode,data,this.noData, this.demNoData);
            this.elevationUpdateBinding();
            if(this.sidePanels)
            {   this.terrain.createSidePanels(this.transformNode,1);    }
            EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);

            if( this.receivedDataCount === this.requests)
            {   EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);   }
        }

        //Delete transformNode when the last response call is done.
        //Until that the pointer is needed to delete the old terrain just before the new terrain is build.
        if( this.receivedDataCount === this.requests )
        {   this.transformNode = null;  }
    }
};

/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WCPSDemAlpha.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendElevationSlider(element,this.index);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WCPS Image with DEM from WCS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WCPSDemWCS = function()
{
    this.setDefaults();
    this.name = "WCPS Image with DEM from WCS Query.";
    /**
     * WCS version for the query.
     * @default "2.0.0"
     * @type {String}
     */
    this.WCSVersion = "2.0.0";
};
EarthServerGenericClient.Model_WCPSDemWCS.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );
/**
 * Sets the url for both the WCPS and WCS Queries.
 * @param wcpsurl - Service URL for the WCPS Request
 * @param demurl  - Service URL for the WCS Request
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.setURLs=function(wcpsurl, demurl){
    /**
     * URL for the WCPS service.
     * @type {String}
     */
    this.URLWCPS = String(wcpsurl);
    /**
     * URL for the WCS service.
     * @type {String}
     */
    this.URLDEM  = String(demurl);
};
/**
 * Sets both coveragenames
 * @param coverageImage - Coverage name for the image dataset.
 * @param coverageDem   - Coverage name for the dem dataset.
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.setCoverages = function (coverageImage, coverageDem) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageImage = String(coverageImage);
    /**
     * Name if the dem coverage.
     * @type {String}
     */
    this.coverageDEM = String(coverageDem);
};
/**
 * Sets a complete custom querystring.
 * @param querystring - the querystring. Use $CI (coverageImage), $CD (coverageDEM),
 * $MINX,$MINY,$MAXX,$MAXY(AoI) and $RESX,ResZ (Resolution) for automatic replacement.
 * Examples: $CI.red , x($MINX:$MINY)
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.setWCPSQuery = function(querystring)
{
    /**
     * The custom query.
     * @type {String}
     */
    this.WCPSQuery = String(querystring);
};

/**
 * Sets the WCS Version for the WCS Query String. Default: "2.0.0"
 * @param version - String with WCS version number.
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.setWCSVersion = function(version)
{
    this.WCSVersion = String(version);
};

/**
 * Sets the Coordinate Reference System.
 * @param value - eg. "http://www.opengis.net/def/crs/EPSG/0/27700"
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.setCoordinateReferenceSystem = function(value)
{
    this.CRS = value;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.coverageImage === undefined || this.coverageDEM === undefined || this.URLWCPS === undefined || this.URLDEM === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined || this.CRS === undefined )
    {
        alert("Not all mandatory values are set. WCPSDemWCS: " + this.name );
        console.log(this);
        return;
    }

    //2: create wcps query
    //If no query was defined use standard query.
    if( this.WCPSQuery === undefined)
    {
        this.WCPSQuery =  "for i in (" + this.coverageImage + ") return encode ( { ";
        this.WCPSQuery += 'red: scale(trim(i.red, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + this.XResolution + '), y:"CRS:1"(0:' + this.ZResolution + ")}, {}); ";
        this.WCPSQuery += 'green: scale(trim(i.green, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + this.XResolution + '), y:"CRS:1"(0:' + this.ZResolution + ")}, {}); ";
        this.WCPSQuery += 'blue: scale(trim(i.blue, {x:"' + this.CRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.CRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + this.XResolution + '), y:"CRS:1"(0:' + this.ZResolution + ")}, {})";
        this.WCPSQuery += '}, "' + this.imageFormat +'" )';
    }
    else //A custom query was defined so use it
    {
        //Replace $ symbols with the actual values
        this.WCPSQuery = this.replaceSymbolsInString(this.WCPSQuery);
        console.log(this.WCPSQuery);
    }
    //3: Make ServerRequest and receive data.
    var bb = {
        minLongitude: this.miny,
        maxLongitude: this.maxy,
        minLatitude:  this.minx,
        maxLatitude:  this.maxx
    };
    EarthServerGenericClient.requestWCPSImageWCSDem(this,this.URLWCPS,this.WCPSQuery,this.URLDEM,this.coverageDEM,bb,this.WCSVersion);
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.receiveData= function( data)
{
    if( this.checkReceivedData(data))
    {
        //Remove the placeHolder
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        var transform = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue),data.minXvalue,data.minZvalue);
        this.root.appendChild( transform);

        //Create Terrain out of the received data
        EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
        this.terrain = new EarthServerGenericClient.LODTerrain(transform, data, this.index, this.noData, this.demNoData);
        this.terrain.createTerrain();
        EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
        this.elevationUpdateBinding();

        if(this.sidePanels)
        {   this.terrain.createSidePanels(transform,1); }

        EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);

        transform = null;
    }
};


/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WCPSDemWCS.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendElevationSlider(element,this.index);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WCS Point Cloud
 * 1 URL for the service, 1 Coverage name point cloud
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WCSPointCloud = function()
{
    this.setDefaults();
    this.name = "WCS Point Cloud";
    /**
     * WCS version for the query.
     * @default "2.0.0"
     * @type {String}
     */
    this.WCSVersion = "2.0.0";
    /**
     * Size of the drawn points.
     * @default 3.0
     * @type {number}
     */
    this.pointSize = 3.0;
};
EarthServerGenericClient.Model_WCSPointCloud.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );

/**
 * Sets the URL for the service.
 * @param url
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.setURL=function(url){
    /**
     * URL for the WCS service.
     * @type {String}
     */
    this.URLWCS = String(url);
};
/**
 * Sets the WCS Version for the WCS Query String. Default: "2.0.0"
 * @param version - String with WCS version number.
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.setWCSVersion = function(version)
{
    this.WCSVersion = String(version);
};
/**
 * Sets the coverage name.
 * @param coveragePointCloud - Coverage name for the image data set.
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.setCoverage = function (coveragePointCloud)
{
    /**
     * Name of the point cloud coverage.
     * @type {String}
     */
    this.coveragePointCloud = String(coveragePointCloud);
};

/**
 * Sets the size of the points in the cloud.
 * @param pointSize - Size of the points in the cloud.
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.setPointSize = function (pointSize)
{
    /**
     * Size of the points in the cloud.
     * @type {String}
     */
    this.pointSize = pointSize;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    // Check if mandatory values are set
    if( this.coveragePointCloud === undefined || this.URLWCS === undefined || this.minh === undefined || this.maxh === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined )
    {
        alert("Not all mandatory values are set. WCSPointCloud: " + this.name );
        console.log(this);
        return;
    }
    // Make ServerRequest and receive data.
    EarthServerGenericClient.requestWCSPointCloud(this,this.URLWCS,this.WCSVersion,this.coveragePointCloud,
                    this.minx,this.maxx,this.miny,this.maxy,this.minh,this.maxh);
};

/**
 * Updates the size of points for this model.
 * @param value - Point size
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.updatePointSize = function(value)
{
    if( this.terrain )
        this.terrain.setPointSize(value);
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.receiveData = function( data)
{
    if( this.checkReceivedData(data))
    {
        //If progressive loading is enabled this function is called multiple times.
        //The lower resolution version shall be removed and replaced with the new one.
        //So the old transformNode will be removed and a new one created.
        if(this.transformNode !== undefined )
        {   this.root.removeChild(this.transformNode); }

        //In the first receiveData call remove the placeholder.
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );

        // build transform
        this.transformNode = this.createTransform(data.width,YResolution,data.height,data.minHMvalue,data.minXvalue,data.minZvalue);
        /*this.transformNode = document.createElement("transform");
        this.transformNode.setAttribute("id", "EarthServerGenericClient_modelTransform"+this.index);
        this.transformNode.setAttribute("onclick","EarthServerGenericClient.MainScene.OnClickFunction("+this.index+",event.hitPnt);");

        var scaleX = (this.cubeSizeX*this.xScale)/(data.width);
        var scaleY = (this.cubeSizeY*this.yScale)/ YResolution;
        var scaleZ = (this.cubeSizeZ*this.zScale)/(data.height);
        this.transformNode.setAttribute("scale", "" + scaleX + " " + scaleY + " " + scaleZ);

        var xoff = (this.cubeSizeX * this.xOffset) - (this.cubeSizeX/2.0) - (scaleX * data.minXvalue);
        var yoff = (this.cubeSizeY * this.yOffset) - (data.minHMvalue*scaleY) - (this.cubeSizeY/2.0);
        var zoff = (this.cubeSizeZ * this.zOffset) - (this.cubeSizeZ/2.0) - (scaleZ * data.minZvalue);
        this.transformNode.setAttribute("translation", "" + xoff+ " " + yoff  + " " + zoff);*/
        this.root.appendChild(this.transformNode);

        // create point cloud terrain
        this.terrain = new EarthServerGenericClient.PointCloudTerrain(this.transformNode,data,this.index,this.pointSize);
        this.terrain.createTerrain();
    }
};

/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WCSPointCloud.prototype.setSpecificElement= function(element)
{
    // change point size
    var id = "EarthServerGenericClient_SliderCell_ps_"+this.index;
    EarthServerGenericClient.appendGenericSlider(element,id,"Point Size",this.index,1,10,this.pointSize, EarthServerGenericClient.MainScene.updatePointSize);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WMS Image with DEM from WCPS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WMSDemWCPS = function()
{
    this.setDefaults();
    this.name = "WMS Image with DEM from WCPS Query.";

    /**
     * WMS version for the query.
     * @default "1.3"
     * @type {String}
     */
    this.WMSVersion = "1.3";
};
EarthServerGenericClient.Model_WMSDemWCPS.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );
/**
 * Sets the urls for the WMS and WCPS Queries. If only one url is given it is used for both requests.
 * @param imageURL - Service URL for the WCPS Image Request
 * @param demURL - Service URL for the WCPS Dem Request
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setURLs=function(imageURL, demURL){
    /**
     * URL for the WCPS image service.
     * @type {String}
     */
    this.imageURL = String(imageURL);
    /**
     * URL for the WCPS Dem service.
     * @type {String}
     */
    this.demURL;
    if(demURL === undefined) // if demURL is not defined use imageURL
    {   this.demURL = String(imageURL); }
    else
    {   this.demURL  = String(demURL);  }
};
/**
 * Sets both coveragenames
 * @param coverageImage - Coverage name for the image dataset.
 * @param coverageDem   - Coverage name for the dem dataset.
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setCoverages = function (coverageImage, coverageDem) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageImage = String(coverageImage);
    /**
     * Name if the dem coverage.
     * @type {String}
     */
    this.coverageDEM = String(coverageDem);
};

/**
 * Sets the WMS Version for the WMS Query String. Default: "1.3"
 * @param version - String with WMS version number.
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setWMSVersion = function(version)
{
    this.WMSVersion = String(version);
};

/**
 * Sets a custom query for the WCPS Dem request.
 * @param querystring - WCPS as a string.
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setWCPSDemQuery = function(querystring)
{
    /**
     * The custom WCPS Dem query.
     * @type {String}
     */
    this.WCPSDemQuery = String(querystring);
};


/**
 * Sets the Coordinate Reference System for the WCPS Query
 * @param value - eg. "http://www.opengis.net/def/crs/EPSG/0/27700"
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setWCPSCoordinateReferenceSystem = function(value)
{
    this.WCPSCRS = value;
};

/**
* Sets the Coordinate Reference System for the WMS Image.
* @param System - eg. CRS,SRS
* @param value - eg. EPSG:4326
*/
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setWMSCoordinateReferenceSystem = function(System,value)
{
    this.WMSCRS = System + "=" + value;
};

/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.coverageImage === undefined || this.coverageDEM === undefined || this.imageURL === undefined || this.demURL === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined || this.WMSCRS === undefined || this.WCPSCRS === undefined )
    {
        alert("Not all mandatory values are set. WCPSDemWCPS: " + this.name );
        console.log(this);
        return;
    }


    if( this.WCPSDemQuery === undefined)
    {
        var currentXRes = this.XResolution;
        var currentZRes = this.ZResolution;
        this.WCPSDemQuery =  "for dtm in (" + this.coverageDEM + ") return encode (";
        this.WCPSDemQuery += 'scale(trim(dtm , {x:"' + this.WCPSCRS + '"(' + this.minx + ":" +  this.maxx + '), y:"' + this.WCPSCRS + '"(' + this.miny + ":" + this.maxy + ') }), {x:"CRS:1"(0:' + currentXRes + '), y:"CRS:1"(0:' + currentZRes + ")}, {})";
        this.WCPSDemQuery += ', "csv" )';
    }
    else //A custom query was defined so use it
    {
        //Replace $ symbols with the actual values
        this.WCPSDemQuery = this.replaceSymbolsInString(this.WCPSDemQuery);
    }

    var bb = {
        minLongitude: this.miny,
        maxLongitude: this.maxy,
        minLatitude:  this.minx,
        maxLatitude:  this.maxx
    };

    // Request
    EarthServerGenericClient.requestWMSImageWCPSDem(this,bb,this.XResolution,this.ZResolution,
        this.imageURL,this.coverageImage,this.WMSVersion,this.WMSCRS,this.imageFormat,this.demURL,this.WCPSDemQuery);
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.receiveData= function( data)
{
    if( this.checkReceivedData(data))
    {
        //Remove the placeHolder
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        var transform = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue),data.minXvalue,data.minZvalue);
        this.root.appendChild( transform);

        //Create Terrain out of the received data
        EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
        this.terrain = new EarthServerGenericClient.LODTerrain(transform, data, this.index, this.noData, this.demNoData);
        this.terrain.createTerrain();
        EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
        this.elevationUpdateBinding(); // notify all bindings about the terrain elevation update

        if(this.sidePanels)
        {   this.terrain.createSidePanels(transform,1); }

        EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);

        transform = null;
    }
};


/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WMSDemWCPS.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendElevationSlider(element,this.index);
};

//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WMS Image with DEM from WCS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WMSDemWCS = function()
{
    this.setDefaults();
    this.name = "WMS Image with DEM from WCS Query.";
    /**
     * WCS version for the query.
     * @default "2.0.0"
     * @type {String}
     */
    this.WCSVersion = "2.0.0";
    /**
     * WMS version for the query.
     * @default "1.3"
     * @type {String}
     */
    this.WMSVersion = "1.3";
};
EarthServerGenericClient.Model_WMSDemWCS.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );
/**
 * Sets the url for both the WMS and WCS Queries.
 * @param WMSurl - Service URL for the WMS Request
 * @param demurl  - Service URL for the WCS Request
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setURLs=function(WMSurl, demurl){
    /**
     * URL for the WMS service.
     * @type {String}
     */
    this.URLWMS = String(WMSurl);
    /**
     * URL for the WCS service.
     * @type {String}
     */
    this.URLDEM  = String(demurl);
};
/**
 * Sets both coverage names
 * @param coverageImage - Coverage name for the image data set.
 * @param coverageDem   - Coverage name for the dem data set.
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setCoverages = function (coverageImage, coverageDem) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageImage = String(coverageImage);
    /**
     * Name if the dem coverage.
     * @type {String}
     */
    this.coverageDEM = String(coverageDem);
};
/**
 * Sets the WCS Version for the WCS Query String. Default: "2.0.0"
 * @param version - String with WCS version number.
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setWCSVersion = function(version)
{
    this.WCSVersion = String(version);
};
/**
 * Sets the WMS Version for the WMS Query String. Default: "1.3"
 * @param version - String with WMS version number.
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setWMSVersion = function(version)
{
    this.WMSVersion = String(version);
};
/**
 * Sets the response format for the WCS Queries.
 * @param format - Format string for the WCS Response
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setFormat=function(WCSFormat){
    /**
     * URL for the WMS service.
     * @type {String}
     */
    this.WCSFormat = String(WCSFormat);
};
/**
 * Sets the Coordinate Reference System.
 * @param System - eg. CRS,SRS
 * @param value - eg. EPSG:4326
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setCoordinateReferenceSystem = function(System, value)
{
    this.CRS = System + "=" + value;
};
/**
 * Sets the output CRS.
 @param outputCRS - The output CRS, e.g. 'http://www.opengis.net/def/crs/EPSG/0/4326'
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setOutputCRS = function(value)
{
    this.outpuCRS = value;
};
/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined)
        alert("root is not defined");

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.coverageImage === undefined || this.coverageDEM === undefined || this.URLWMS === undefined || this.URLDEM === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined || this.CRS === undefined
        || this.WCSFormat === undefined)
    {
        alert("Not all mandatory values are set. WMSDemWCS: " + this.name );
        console.log(this);
        return;
    }

    //2: Make ServerRequest and receive data.
    var bb = {
        minLongitude: this.miny,
        maxLongitude: this.maxy,
        minLatitude:  this.minx,
        maxLatitude:  this.maxx
    };

    EarthServerGenericClient.requestWMSImageWCSDem(this,bb,this.XResolution,this.ZResolution,
                                                this.URLWMS,this.coverageImage,this.WMSVersion,this.CRS,this.imageFormat,
                                                this.URLDEM,this.coverageDEM,this.WCSVersion,this.WCSFormat);
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.receiveData= function( data)
{
    if( this.checkReceivedData(data))
    {
        //Remove the placeHolder
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        var transform = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue),data.minXvalue,data.minZvalue);
        this.root.appendChild( transform);

        //Create Terrain out of the received data
        EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
        this.terrain = new EarthServerGenericClient.LODTerrain(transform, data, this.index, this.noData, this.demNoData);
        this.terrain.createTerrain();
        EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
        this.elevationUpdateBinding();
        if(this.sidePanels)
        {   this.terrain.createSidePanels(this.transformNode,1);    }
        EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);

        transform = null;
    }
};


/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WMSDemWCS.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendElevationSlider(element,this.index);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Scene Model: WMS Image with DEM from WCS Query
 * 2 URLs for the service, 2 Coverage names for the image and dem.
 * @augments EarthServerGenericClient.AbstractSceneModel
 */
EarthServerGenericClient.Model_WMSDemWMS = function()
{
    this.setDefaults();
    this.name = "WMS Image with DEM from WMS Query.";
    /**
     * WMS version for the query.
     * @default "1.3"
     * @type {String}
     */
    this.WMSVersion = "1.3";
};
EarthServerGenericClient.Model_WMSDemWMS.inheritsFrom( EarthServerGenericClient.AbstractSceneModel );
/**
 * Sets the timespan for the request
 * @param timespan - eg. '2013-06-05T00:00:00Z/2013-06-08T00:00:00Z'
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setBoundingBox = function(minx, miny, maxx, maxy) {
    this.bbox = {
        minLongitude: miny,
        maxLongitude: maxy,
        minLatitude: minx,
        maxLatitude: maxx
    };
};
/**
 * Sets the url for both the WMS and WCS Queries.
 * @param WMSurl - Service URL for the WMS Request
 * @param demurl  - Service URL for the WCS Request
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setURLs=function(WMSurl, demurl){
    /**
     * URL for the WMS service.
     * @type {String}
     */
    this.URLWMS = String(WMSurl);
    /**
     * URL for the WCS service.
     * @type {String}
     */
    this.URLDEM  = String(demurl);
};
/**
 * Sets both coverage names
 * @param coverageImage - Coverage name for the image data set.
 * @param coverageDem   - Coverage name for the dem data set.
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setCoverages = function (coverageImage, coverageDem) {
    /**
     * Name of the image coverage.
     * @type {String}
     */
    this.coverageImage = String(coverageImage);
    /**
     * Name if the dem coverage.
     * @type {String}
     */
    this.coverageDEM = String(coverageDem);
};
/**
 * Sets the WMS Version for the WMS Query String. Default: "1.3"
 * @param version - String with WMS version number.
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setWCSVersion = function(version)
{
    this.WCSVersion = String(version);
};
/**
 * Sets the WMS Version for the WMS Query String. Default: "1.3"
 * @param version - String with WMS version number.
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setWMSVersion = function(version)
{
    this.WMSVersion = String(version);
};
/**
 * Sets the data type for the ajax call executing the WCS query.
 * @param type - Datatype for the ajax call (default: 'XML')
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setWCSDataType =function(type){
    this.WCSDataType = String(type);
};
/**
 * Sets the desired MIME type for the response of the WCS Queries.
 * @param type - MIME string for the WCS Response (i.e.: 'image/x-aaigrid')
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setWCSMimeType =function(type){
    this.WCSMimeType = String(type);
};
/**
 * Sets the Coordinate Reference System.
 * @param System - eg. CRS,SRS
 * @param value - eg. EPSG:4326
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setCoordinateReferenceSystem = function(System, value)
{
    this.CRS = System + "=" + value;
};
/**
 * Sets the output CRS.
 @param outputCRS - The output CRS, e.g. 'http://www.opengis.net/def/crs/EPSG/0/4326'
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setOutputCRS = function(value)
{
    this.WCSOutputCRS = value;
};
/**
 * Sets the timespan for the request
 * @param timespan - eg. '2013-06-05T00:00:00Z/2013-06-08T00:00:00Z'
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setTimespan = function(timespan)
{
    this.timespan = timespan;
};
/**
 * Creates the x3d geometry and appends it to the given root node. This is done automatically by the SceneManager.
 * @param root - X3D node to append the model.
 * @param cubeSizeX - Size of the fishtank/cube on the x-axis.
 * @param cubeSizeY - Size of the fishtank/cube on the y-axis.
 * @param cubeSizeZ - Size of the fishtank/cube on the z-axis.
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.createModel=function(root, cubeSizeX, cubeSizeY, cubeSizeZ){
    if( root === undefined) {
        console.log("root is not defined");
    }

    EarthServerGenericClient.MainScene.timeLogStart("Create Model " + this.name);

    this.cubeSizeX = cubeSizeX;
    this.cubeSizeY = cubeSizeY;
    this.cubeSizeZ = cubeSizeZ;

    this.root = root;

    // FIXXME: this is not the right place for eventually setting the default value:
    if (!this.WCSMimeType) {
        this.WCSMimeType = 'image/x-aaigrid';
    }

    //Create Placeholder
    this.createPlaceHolder();

    //1: Check if mandatory values are set
    if( this.coverageImage === undefined || this.coverageDEM === undefined || this.URLWMS === undefined || this.URLDEM === undefined
        || this.minx === undefined || this.miny === undefined || this.maxx === undefined || this.maxy === undefined || this.CRS === undefined)
    {
        console.log(this);
        return;
    }

    //2: Make ServerRequest and receive data.
    var bb = {
        minLongitude: this.miny,
        maxLongitude: this.maxy,
        minLatitude:  this.minx,
        maxLatitude:  this.maxx
    };

    EarthServerGenericClient.requestWMSImageWCSDem(this,bb,this.XResolution,this.ZResolution,
                                                this.URLWMS,this.coverageImage,this.WMSVersion,this.CRS,this.imageFormat,
                                                this.URLDEM,this.coverageDEM,this.WCSVersion,this.WCSMimeType,this.WCSDataType, 
                                                this.WCSOutputFormat,this.WCSOutputCRS,this.timespan);
};

/**
 * This is a callback method as soon as the ServerRequest in createModel() has received it's data.
 * This is done automatically.
 * @param data - Received data from the ServerRequest.
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.receiveData= function( data)
{
    if( this.checkReceivedData(data))
    {
        //Remove the placeHolder
        this.removePlaceHolder();

        var YResolution = this.YResolution || (parseFloat(data.maxHMvalue) - parseFloat(data.minHMvalue) );
        var transform = this.createTransform(data.width,YResolution,data.height,parseFloat(data.minHMvalue),data.minXvalue,data.minZvalue);
        this.root.appendChild( transform);

        //Create Terrain out of the received data
        EarthServerGenericClient.MainScene.timeLogStart("Create Terrain " + this.name);
        this.terrain = new EarthServerGenericClient.LODTerrain(transform, data, this.index, this.noData, this.demNoData);
        this.terrain.createTerrain();
        EarthServerGenericClient.MainScene.timeLogEnd("Create Terrain " + this.name);
        this.elevationUpdateBinding();
        if(this.sidePanels)
        {   this.terrain.createSidePanels(this.transformNode,1);    }
        EarthServerGenericClient.MainScene.timeLogEnd("Create Model " + this.name);

        transform = null;
    }
};


/**
 * Every Scene Model creates it's own specific UI elements. This function is called automatically by the SceneManager.
 * @param element - The element where to append the specific UI elements for this model.
 */
EarthServerGenericClient.Model_WMSDemWMS.prototype.setSpecificElement= function(element)
{
    EarthServerGenericClient.appendElevationSlider(element,this.index);
};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Generic Server Response Data object. All requests store the response in an instance of this object.
 * One instance can be given as parameter for different requests if all requests writes different fields.
 * Example: One WMS request for the texture and one WCS request for the heightmap.
 */
EarthServerGenericClient.ServerResponseData = function () {
    this.heightmap = null;          // Heightmap
    this.pointCloudCoordinates = null; // Point cloud coordinates
    this.noDataValue = undefined;   // The value that should be considered as NODATA.
    this.heightmapUrl = "";         // If available, you can use the link as alternative.
    this.texture = new Image();     // Texture as image object
    this.texture.crossOrigin = '';  // Enable Texture to be edited (for alpha values for example)
    this.textureUrl = "";           // If available, you can use the link as alternative.
    this.width = 0;                 // Heightmap or pointcloud width
    this.height = 0;                // Heightmap or pointcloud height

    // The information about the heightmap are used to position a module correctly in the fishtank.
    // The minimum value as offset and the difference between minimum and maximum for scaling.
    this.minHMvalue =  Number.MAX_VALUE;// Lowest value in the heightmap or pointcloud
    this.maxHMvalue = -Number.MAX_VALUE;// Highest value in the heigtmap or pointcloud
    this.averageHMvalue = 0;        // Average value of the heightmap or pointcloud
    this.minXvalue =  Number.MAX_VALUE; // Lowest coordinate value on the X-axis of a pointcloud
    this.maxXvalue = -Number.MAX_VALUE; // Highest coordinate value on the X-axis of a pointcloud
    this.minZvalue =  Number.MAX_VALUE; // Lowest coordinate value on the Z-axis of a pointcloud
    this.maxZvalue = -Number.MAX_VALUE; // Highest coordinate value on the X-axis of a pointcloud

    // Flags to customize the server response
    this.heightmapAsString = false;  // Flag if heightmap is encoded as a array of arrays(default) or as a string with csv.
    this.validateHeightMap = true;   // Flag if heightmap should be checked in validate().
    this.validateTexture   = true;   // Flag if the texture should be checked in validate().
    this.validatePointCloud = false; // Flag if the point cloud should be in validate().
    this.removeAlphaChannel = false; // Flag if the alpha channel contains e.g. height data it should be removed for the texture

    /**
     * Validates if the response full successfully: Was an image and a height map received?
     * @returns {boolean} - True if both image and heightmap are present, false if not.
     */
    this.validate = function()
    {
        //Texture
        if( this.validateTexture )
        {
            if( this.texture === undefined){    return false;   }
            if( this.texture.width <= 0 || this.texture.height <=0){    return false;   }
        }

        //Heightmap
        if( this.validateHeightMap )
        {
            if( this.heightmap === null){    return false;   }
            if( this.width === null || this.height === null){    return false;   }
            if( this.minHMvalue === Number.MAX_VALUE || this.maxHMvalue === -Number.MAX_VALUE){    return false;   }
        }

        // point cloud
        if( this.validatePointCloud )
        {
            if( this.pointCloudCoordinates === null) return false;
            if( this.width === null || this.height === null){    return false;   }
            if( this.minHMvalue === Number.MAX_VALUE || this.maxHMvalue === -Number.MAX_VALUE){    return false;   }
        }

        //Everything OK
        return true;
    };
};

/**
 * Small helper to synchronise multiple request callbacks. After all callbacks to this helper
 * are received the ResponseData object with all response data is send to the module.
 * After each request is received a progress update is send to the module.
 * @param callback - Module which requests the data.
 * @param numberToCombine - Number of callbacks that shall be received.
 * @param saveDataInArray - In most cases one responseData is used. If set true the data is stored in an array.
 */
EarthServerGenericClient.combinedCallBack = function(callback,numberToCombine,saveDataInArray)
{
    var counter = 0;
    this.name = "Combined Callback: " + callback.name;
    this.dataArray = [];
    EarthServerGenericClient.MainScene.timeLogStart("Combine: " + callback.name);

    /**
     * @ignore
     * @param data - Server response data object
     */
    this.receiveData = function(data)
    {
        counter++;

        if(saveDataInArray)
            this.dataArray.push(data);

        if( counter ==  numberToCombine)
        {
            EarthServerGenericClient.MainScene.timeLogEnd("Combine: " + callback.name);

            if(saveDataInArray)// callback with the 1 responseData or the array
                callback.receiveData(this.dataArray);
            else
                callback.receiveData(data);
        }
    };

    /**
     * @ignore
     * @returns {undefined|float} - Returns the noData value of the dem from the module.
     */
    this.getDemNoDataValue = function()
    {
        return callback.getDemNoDataValue();
    };

    /**
     * @ignore
     * @returns {undefined|float} - Returns the noData value of the dem from the module.
     */
    this.getModel = function()
    {
        return callback;
    };
};

/**
 * Requests a WMS image, stores it in the responseData and make the callback once it is loaded.
 * @param callback - Object to do the callback.
 * @param responseData - Instance of the ServerResponseData.
 * @param WMSurl - URL of the WMS service.
 * @param WMScoverID - Coverage/Layer ID.
 * @param WMSCRS - The Coordinate Reference System. (Should be like: "crs=1")
 * @param WMSImageFormat - The image format that should be returned.
 * @param BoundingBox - The bounding box of the image.
 * @param WMSVersion - WMS Version that should be used.
 * @param width - Width of the response image.
 * @param height - Height of the response image.
 */
EarthServerGenericClient.getCoverageWMS = function(callback,responseData,WMSurl,WMScoverID,WMSCRS,WMSImageFormat,BoundingBox,WMSVersion,width,height,timespan, transparent)
{
    responseData.textureUrl = WMSurl + "?service=WMS&version=" + WMSVersion +"&request=Getmap&layers=" + WMScoverID;
    responseData.textureUrl += "&" + WMSCRS + "&format=image/" + WMSImageFormat;
    responseData.textureUrl += "&bbox=" + BoundingBox.minLatitude + "," + BoundingBox.minLongitude + ","+ BoundingBox.maxLatitude + "," + BoundingBox.maxLongitude;
    responseData.textureUrl += "&width="+width+"&height="+height;
    if (transparent) {
        responseData.textureUrl += "&transparent="+transparent;
    }
    if (timespan) {
        responseData.textureUrl += "&time="+timespan;
    }

    responseData.texture.onload = function()
    {
        callback.receiveData(responseData);
    };
    responseData.texture.onerror = function()
    {
        x3dom.debug.logInfo("Could not load Image.");
        callback.receiveData(responseData);
    };
    responseData.texture.src = responseData.textureUrl;

};

/**
 * Starts a WCPS query and stores the received image in the responseData.
 * If a dem is encoded in the alpha channel it will be extracted and also stored. Set DemInAlpha Flag in this case.
 * @param callback - Object to do the callback.
 * @param responseData - Instance of the ServerResponseData.
 * @param url - URL of the WCPS service.
 * @param query - The WCPS query.
 * @param DemInAlpha - Flag if a dem is encoded in the alpha channel.
 */
EarthServerGenericClient.getWCPSImage = function(callback,responseData,url, query, DemInAlpha)
{
    try
    {
        responseData.texture.onload = function()
        {
            EarthServerGenericClient.MainScene.timeLogEnd("WCPS: " + callback.name);
            if(DemInAlpha)
            {
                responseData.heightmapUrl = responseData.texture.src;
                var demNoData = callback.getDemNoDataValue();

                var canvas = document.createElement('canvas');
                canvas.width = responseData.texture.width;
                canvas.height = responseData.texture.height;

                var context = canvas.getContext('2d');
                context.drawImage(responseData.texture, 0, 0);

                var hm = new Array(canvas.width);
                for(var k=0; k<canvas.width; k++)
                {
                    hm[k] = new Array(canvas.height);
                }

                responseData.width = hm.length;
                responseData.height = hm[0].length;
                responseData.minXvalue = 0;
                responseData.minZvalue = 0;
                responseData.maxXvalue = hm.length;
                responseData.maxZvalue = hm[0].length;

                var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                var total = 0;
                for(var i=3; i<imageData.data.length; i+=4)
                {
                    var index = i/4;
                    hm[parseInt(index%hm.length)][parseInt(index/hm.length)] = imageData.data[i];

                    if(imageData.data[i] !== demNoData)
                    {
                        if( responseData.minHMvalue > imageData.data[i] )
                        { responseData.minHMvalue = imageData.data[i]  }
                        if( responseData.maxHMvalue < imageData.data[i] )
                        { responseData.maxHMvalue = imageData.data[i]  }
                        total = total + parseFloat(imageData.data[i]);
                    }

                }
                responseData.averageHMvalue = parseFloat(total / imageData.data.length);
                responseData.heightmap = hm;

                context = null;
                canvas = null;
            }

            callback.receiveData(responseData);
        };
        responseData.texture.onerror = function()
        {
            responseData.texture = new Image();
            responseData.texture.onload = callback.receiveData(responseData);
            responseData.texture.src="defaultTexture.png";
            console.log("ServerRequest::wcpsRequest(): Could not load Image from url " + url);
        };

        responseData.textureUrl = url + "?query=" + encodeURIComponent(query);
        EarthServerGenericClient.MainScene.timeLogStart("WCPS: " + callback.name);
        responseData.texture.src = responseData.textureUrl;
    }
    catch(error)
    {
        x3dom.debug.logInfo('ServerRequest::getWCPSImage(): ' + error);
        callback.receiveData(responseData);
    }
};

/**
 * This function sends the WCPS query to the specified service and tries to interpret the received data as a DEM.
 * @param callback - Object to do the callback.
 * @param responseData - Instance of the ServerResponseData.
 * @param WCPSurl - URl of the WCPS service.
 * @param WCPSquery - The WCPS request query.
 */
EarthServerGenericClient.getWCPSDemCoverage = function(callback,responseData,WCPSurl,WCPSquery)
{
    EarthServerGenericClient.MainScene.timeLogStart("WCPS DEM Coverage: " + callback.name );
    var query = "query=" + encodeURIComponent(WCPSquery);

    $.ajax(
        {
            url: WCPSurl,
            type: 'GET',
            dataType: 'text',
            data: query,
            success: function(receivedData)
            {
                try{
                EarthServerGenericClient.MainScene.timeLogEnd("WCPS DEM Coverage: " + callback.name );
                var demNoData = callback.getDemNoDataValue();
                //The received data is a list of tuples: {value,value},{value,value},.....
                var tuples = receivedData.split('},');

                var sizeX = tuples.length;
                if( sizeX <=0 || isNaN(sizeX)  )
                {   throw "getWCPSDemCoverage: "+WCPSurl+": Invalid data size ("+sizeX+")"; }


                var hm = new Array(sizeX);
                for(var o=0; o<sizeX;o++)
                {   hm[o] = []; }

                for (var i = 0; i < tuples.length; i++)
                {
                    var tmp = tuples[i].substr(1);
                    var valuesList = tmp.split(",");

                    for (var k = 0; k < valuesList.length; k++)
                    {
                        tmp = parseFloat(valuesList[k]);
                        hm[i][k] = tmp;

                        if( tmp !== demNoData)
                        {
                            if (responseData.maxHMvalue < tmp)
                            {
                                responseData.maxHMvalue = parseFloat(tmp);
                            }
                            if (responseData.minHMvalue > tmp)
                            {
                                responseData.minHMvalue = parseFloat(tmp);
                            }
                        }
                    }
                }
                if(responseData.minHMvalue!=0 && responseData.maxHMvalue!=0)
                {
                    responseData.averageHMvalue = (responseData.minHMvalue+responseData.maxHMvalue)/2;
                }
                tuples = null;

                responseData.width = hm.length;
                responseData.height = hm[0].length;
                responseData.minXvalue = 0;
                responseData.minZvalue = 0;
                responseData.maxXvalue = hm.length;
                responseData.maxZvalue = hm[0].length;
                responseData.heightmap = hm;

                }
                catch(err)
                {   alert(err); }

                callback.receiveData(responseData);
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                EarthServerGenericClient.MainScene.timeLogEnd("WCPS DEM Coverage: " + callback.name );
                console.log('\t' + xhr.status +" " + ajaxOptions + " " + thrownError);
            }
        }
    );
};

/**
 * Requests a WCS point cloud and stores the coordinate string in the response data.
 * @param callback
 * @param responseData
 * @param WCSurl
 * @param WCSversion
 * @param WCScoverID
 * @param minx
 * @param maxx
 * @param miny
 * @param maxy
 * @param minh
 * @param maxh
 */
EarthServerGenericClient.getPointCloudWCS = function(callback,responseData,WCSurl,WCSversion,WCScoverID,minx,maxx,miny,maxy,minh,maxh)
{
    var request = 'service=WCS&Request=GetCoverage&version=' + WCSversion + '&CoverageId=' + WCScoverID;
    request += '&subset=Lat('+minx+','+maxx+')&subset=Long('+miny+','+maxy+')&subset=h('+minh+','+maxh+')';

    EarthServerGenericClient.MainScene.timeLogStart("WCS Coverage: " + callback.name );

    $.ajax(
        {
            url: WCSurl,
            type: 'GET',
            dataType: 'XML',
            data: request,
            success: function(receivedData)
            {

                //console.log(receivedData);

                try{
                    EarthServerGenericClient.MainScene.timeLogEnd("WCS PointCloud Coverage: " + callback.name );
                    var coords = $(receivedData).find(String("SimpleMultiPoint")).text();


                    if(coords && coords.length )
                    {
                        while( !EarthServerGenericClient.IsNumeric(coords.charAt(0) ))
                        {   coords = coords.substr(1);  }

                        var coordsArray = coords.split(" ");

                        // check all coords to set min,max,width&height values
                        for(var i=0; i+2< coordsArray.length; i+=3)
                        {
                            if( isNaN( parseFloat(coordsArray[i] ) )) continue;
                            if( isNaN( parseFloat(coordsArray[i+1] ))) continue;
                            if( isNaN( parseFloat(coordsArray[i+2] ))) continue;

                            // check min/max value on x axis
                            if( parseFloat(coordsArray[i]) < responseData.minXvalue) responseData.minXvalue = parseFloat(coordsArray[i]);
                            if( parseFloat(coordsArray[i]) > responseData.maxXvalue) responseData.maxXvalue = parseFloat(coordsArray[i]);
                            // check min/max hm value (y-axis)
                            if( parseFloat(coordsArray[i+2]) < responseData.minHMvalue) responseData.minHMvalue = parseFloat(coordsArray[i+2]);
                            if( parseFloat(coordsArray[i+2]) > responseData.maxHMvalue) responseData.maxHMvalue = parseFloat(coordsArray[i+2]);
                            // check min/max value on z axis
                            if( parseFloat(coordsArray[i+1]) < responseData.minZvalue) responseData.minZvalue = parseFloat(coordsArray[i+1]);
                            if( parseFloat(coordsArray[i+1]) > responseData.maxZvalue) responseData.maxZvalue = parseFloat(coordsArray[i+1]);
                        }

                        //switch y/z values and lower the values
                        var pointCloudCoordinatesArray = [];
                        for( i=0; i< coordsArray.length; i+=3)
                        {
                            if( isNaN( parseFloat(coordsArray[i]))  ) continue;
                            if( isNaN( parseFloat(coordsArray[i+1]) )) continue;
                            if( isNaN( parseFloat(coordsArray[i+2] ))) continue;

                            pointCloudCoordinatesArray.push( parseFloat(coordsArray[i  ]) - parseInt(responseData.minXvalue ) );
                            pointCloudCoordinatesArray.push( parseFloat(coordsArray[i+2]) - parseInt(responseData.minHMvalue) );
                            pointCloudCoordinatesArray.push( parseFloat(coordsArray[i+1]) - parseInt(responseData.minZvalue ) );
                        }

                        responseData.maxXvalue -= parseInt( responseData.minXvalue);
                        responseData.minXvalue -= parseInt( responseData.minXvalue);

                        responseData.maxZvalue -= parseInt( responseData.minZvalue);
                        responseData.minZvalue -= parseInt( responseData.minZvalue);

                        responseData.maxHMvalue -= parseInt( responseData.minHMvalue );
                        responseData.minHMvalue -= parseInt( responseData.minHMvalue );

                        responseData.width  = responseData.maxXvalue - responseData.minXvalue + 1;
                        responseData.height = responseData.maxZvalue - responseData.minZvalue + 1;
                    }
                    else
                        console.log("No coords");

                    responseData.pointCloudCoordinates = pointCloudCoordinatesArray.join(" ");
                }
                catch(err)
                {   alert(err); }

                callback.receiveData(responseData);
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                EarthServerGenericClient.MainScene.timeLogEnd("WCS PointCloud Coverage: " + callback.name );
                x3dom.debug.logInfo('\t' + xhr.status +" " + ajaxOptions + " " + thrownError);
            }
        }
    );
};

/**
 * Requests a WCS coverage and stores is the heightmap field of the responseData.
 * @param callback - Object to do the callback.
 * @param responseData - Instance of the ServerResponseData.
 * @param WCSurl - URl of the WCS service.
 * @param WCScoverID - ID of the coverage.
 * @param WCSBoundingBox - Bounding Box of the area.
 * @param WCSVersion - Version of used WCS service.
 * @param WCSMimeType - MIME type of the WCS response (i.e. 'image/x-aaigrid').
 * @param WCSDataType - The requested datatype for WCS response (equals to the 'dataType' field in a $.ajax call, i.e. 'XML', 'text', ...)
 */
EarthServerGenericClient.getCoverageWCS = function(callback,responseData,WCSurl,WCScoverID,WCSBoundingBox,WCSVersion,WCSMimeType,WCSDataType,WCSOutputFormat,ResX,ResY,WCSOutputCRS)
{
    var request = 'service=WCS&Request=GetCoverage&version=' + WCSVersion + '&CoverageId=' + WCScoverID;
    //var WCSOutputCRS = 'http://www.opengis.net/def/crs/EPSG/0/4326';
    if (typeof WCSOutputCRS !== 'undefined') {
        request += '&subsetx=x,' + WCSOutputCRS + '(' + WCSBoundingBox.minLatitude + ',' + WCSBoundingBox.maxLatitude + ')&subsety=y,' + WCSOutputCRS + '(' + WCSBoundingBox.minLongitude + ',' + WCSBoundingBox.maxLongitude + ')';
    } else {
        request += '&subsetx=x(' + WCSBoundingBox.minLatitude + ',' + WCSBoundingBox.maxLatitude + ')&subsety=y(' + WCSBoundingBox.minLongitude + ',' + WCSBoundingBox.maxLongitude + ')';
    }
    request += '&size=x(' + ResX + ')&size=y(' + ResY + ')';
    if (WCSMimeType) {
        request += '&format=' + WCSMimeType;
    }

    var datatype = 'XML'; // default value is 'XML' to not break code using previous versions of the EarthServerGenericClient
    if (WCSDataType) {
        datatype = WCSDataType;
    }

    EarthServerGenericClient.MainScene.timeLogStart("WCS Coverage: " + callback.name );

    // request = 'service=wcs&version=2.0.0&request=GetCoverage&outputCRS=http://www.opengis.net/def/crs/EPSG/0/4326&size=x(33)&size=y(33)&coverageid=ACE2&format=image/x-aaigrid&subset=x,http://www.opengis.net/def/crs/EPSG/0/4326(-22.5,-11.25)&subset=y,http://www.opengis.net/def/crs/EPSG/0/4326(33.75,45)';
    //request = 'service=wcs&version=2.0.0&request=GetCoverage&outputCRS=http://www.opengis.net/def/crs/EPSG/0/4326&size=x(500)&size=y(500)&coverageid=ACE2&format=image/x-aaigrid&subset=x,http://www.opengis.net/def/crs/EPSG/0/4326(-22.5,-11.25)&subset=y,http://www.opengis.net/def/crs/EPSG/0/4326(33.75,45)';

    $.ajax(
        {
            url: WCSurl,
            type: 'GET',
            dataType: datatype,
            data: request,
            success: function(receivedData)
            {
                try{
                EarthServerGenericClient.MainScene.timeLogEnd("WCS Coverage: " + callback.name );

                var didHandle = callback.getModel().preprocessReceivedData(receivedData, responseData, WCSMimeType);
                // Defaults to the following implementation to not break old code:
                if (!didHandle) {
                    var Grid = $(receivedData).find('GridEnvelope');
                    var low  = $(Grid).find('low').text().split(" ");
                    var high = $(Grid).find('high').text().split(" ");

                    var sizeX = high[0] - low[0] + 1;
                    var sizeY = high[1] - low[1] + 1;

                    if( sizeX <=0 || sizeY <=0 || isNaN(sizeX) || isNaN(sizeY) )
                    {   throw "getCoverageWCS: "+WCSurl+"/"+WCScoverID+": Invalid grid size ("+sizeX+","+sizeY+")"; }

                    responseData.height = sizeX;
                    responseData.width  = sizeY;

                    console.log(sizeX,sizeY);

                    var hm = new Array(sizeX);
                    for(var index=0; index<hm.length; index++)
                    {
                        hm[index] = new Array(sizeY);
                    }

                    var DataBlocks = $(receivedData).find('DataBlock');
                    DataBlocks.each(function () {
                        var tuples = $(this).find("tupleList").text().split('},');
                        for (var i = 0; i < tuples.length; i++) {
                            var tmp = tuples[i].substr(1);
                            var valuesList = tmp.split(",");

                            for (var k = 0; k < valuesList.length; k++) {
                                tmp = parseFloat(valuesList[k]);

                                hm[parseInt(k/(sizeX))][parseInt(k%(sizeX))] = tmp;

                                if (responseData.maxHMvalue < tmp)
                                {
                                    responseData.maxHMvalue = parseFloat(tmp);
                                }
                                if (responseData.minHMvalue > tmp)
                                {
                                    responseData.minHMvalue = parseFloat(tmp);
                                }
                            }
                        }
                        if(responseData.minHMvalue!=0 && responseData.maxHMvalue!=0)
                        {
                            responseData.averageHMvalue = (responseData.minHMvalue+responseData.maxHMvalue)/2;
                        }
                        tuples = null;
                    });
                    DataBlocks = null;

                    responseData.minXvalue = 0;
                    responseData.minZvalue = 0;
                    responseData.maxXvalue = sizeY;
                    responseData.maxZvalue = sizeX;
                    responseData.heightmap = hm;
                    }
                }
                catch(err)
                {   alert(err); }

                callback.receiveData(responseData);
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                EarthServerGenericClient.MainScene.timeLogEnd("WCS Coverage: " + callback.name );
                x3dom.debug.logInfo('\t' + xhr.status +" " + ajaxOptions + " " + thrownError);
            }
        }
    );
};

/**
 * Requests one image via WCSPS. It is assumed that the image has a dem encoded in the alpha channel.
 * If not the terrain is flat.
 * @param callback - Module that requests the image.
 * @param WCPSurl - URL of the WCPS service.
 * @param WCPSquery - The WCPS query.
 */
EarthServerGenericClient.requestWCPSImageAlphaDem = function(callback,WCPSurl,WCPSquery)
{
    var responseData = new EarthServerGenericClient.ServerResponseData();
    responseData.removeAlphaChannel = true; // Remove the alpha channel for the final texture
    EarthServerGenericClient.getWCPSImage(callback,responseData,WCPSurl,WCPSquery,true);
};

/**
 * Requests one image via WCSPS.
 * @param callback - Module that requests the image.
 * @param WCPSurl - URL of the WCPS service.
 * @param WCPSquery - The WCPS query.
 */
EarthServerGenericClient.requestWCPSImage = function(callback,WCPSurl,WCPSquery)
{
    var responseData = new EarthServerGenericClient.ServerResponseData();
    responseData.validateHeightMap = false; // No heightmap in this response intended so don't check it in validate()
    EarthServerGenericClient.getWCPSImage(callback,responseData,WCPSurl,WCPSquery,false);
};

/**
 * The progressive WCPS loader initiate multiple queries consecutively. As soon as one response is received the
 * next query is executed. Every response is given to the given callback.
 * Note: The WCPS loader starts with the last query in the array (LIFO).
 * @param callback - Module that requests the WCPS images.
 * @param WCPSurl - URL of the WCPS service.
 * @param WCPSqueries - Array of WCPS queries. (LIFO)
 * @param DemInAlpha - Flag if a dem is encoded in the alpha channel.
 */
EarthServerGenericClient.progressiveWCPSImageLoader = function(callback,WCPSurl,WCPSqueries,DemInAlpha)
{
    var which = WCPSqueries.length -1;
    //We need one responseData for every query in WCPSqueries
    var responseData = [];
    //For time logging.
    this.name = "Progressive WCPS Loader: " + callback.name;

    for(var i=0;i<WCPSqueries.length;i++)
    {
        responseData[i] = new EarthServerGenericClient.ServerResponseData();
        responseData[i].removeAlphaChannel = DemInAlpha; // Should the alpha channel be removed for the final texture?
    }

    /**
     * @ignore
     * @param which - index of the request to make.
     */
    this.makeRequest =  function(which)
    {
        if(which >= 0)
        {
            EarthServerGenericClient.MainScene.timeLogStart("Progressive WCPS: " + WCPSurl + "_Query_" +which);
            EarthServerGenericClient.getWCPSImage(this,responseData[which],WCPSurl,WCPSqueries[which],DemInAlpha);
        }
        else
        {   responseData = null;  }
    };
    /**
     * @ignore
     * @param data - Server response data object
     */
    this.receiveData = function(data)
    {
        EarthServerGenericClient.MainScene.timeLogEnd("Progressive WCPS: " + WCPSurl + "_Query_" +which);
        which--;
        this.makeRequest(which);
        callback.receiveData(data);
    };
    this.makeRequest(which);
};

/**
 * Requests an image via WCPS and a dem via WCS.
 * @param callback - Module requesting this data.
 * @param WCPSurl - URL of the WCPS service.
 * @param WCPSquery - WCPS Query for the image.
 * @param WCSurl - URL of the WCS service.
 * @param WCScoverID - Coverage ID for the WCS height data.
 * @param WCSBoundingBox - Bounding box of the area used in WCS.
 * @param WCSVersion - Version of the used WCS.
 */
EarthServerGenericClient.requestWCPSImageWCSDem = function(callback,WCPSurl,WCPSquery,WCSurl,WCScoverID,WCSBoundingBox,WCSVersion)
{
    var responseData = new EarthServerGenericClient.ServerResponseData();
    var combine = new EarthServerGenericClient.combinedCallBack(callback,2);

    EarthServerGenericClient.getWCPSImage(combine,responseData,WCPSurl,WCPSquery,false);
    EarthServerGenericClient.getCoverageWCS(combine,responseData,WCSurl,WCScoverID,WCSBoundingBox,WCSVersion);
};


EarthServerGenericClient.requestWCPSImageWCPSDem = function(callback,imageURL,imageQuery,demURL,demQuery)
{
    var responseData = new EarthServerGenericClient.ServerResponseData();
    var combine = new EarthServerGenericClient.combinedCallBack(callback,2);

    EarthServerGenericClient.getWCPSImage(combine,responseData,imageURL,imageQuery,false);
    EarthServerGenericClient.getWCPSDemCoverage(combine,responseData,demURL,demQuery);
};

/**
 * Carries out the requests from all OGCProviders stored in the parameter array.
 * @param opts.timespan
 * @param opts.bbox
 * @param opts.resX
 * @param opts.resY
 */
EarthServerGenericClient.sendRequests = function(calling_module, layerRequests, opts) {
    var promise = new EarthServerGenericClient.combinedCallBack(calling_module, layerRequests.length, true);

    for (var idx = 0; idx < layerRequests.length; ++idx) {
        var layerRequest = layerRequests[idx];
        var responseData = new EarthServerGenericClient.ServerResponseData();
        // FIXXME: necessary for LODTerrainWithOverlays. The 'info' object is _not_ (yet) specified in ServerResponseData!
        responseData.layerInfo = {
            id: layerRequest.id,
            opacity: layerRequest.opacity,
            ordinal: layerRequest.ordinal
        };

        switch (layerRequest.protocol) {
            case 'WMS':
                var WMSurl = layerRequest.urls[0];
                var WMScoverID = layerRequest.id;
                var WMSCRS = 'SRS=' + layerRequest.crs;
                var WMSImageFormat = layerRequest.format;
                var BoundingBox = opts.bbox;
                var WMSversion = layerRequest.version;
                var ResX = opts.resX;
                var ResZ = opts.resZ;
                var timespan = opts.timespan;
                var transparent = layerRequest.transparent;

                // FIXXME: get rid of the plethora of parameters and replace them with a single 'opts' object. It's Javascript, after all ;-)
                //   API-Suggestion:  ESGC.getCoverageWMS(promise, opts, true/false) -> true/false determines if one ServerResponseData
                //   object is created internally for all requests, or if each response gets its own ServerResponseData object.
                //   Future API-Suggestion: The functionality of generating and carrying out a request is the sole responsibility of the 
                //   'OGCRequest' class. 'sendRequests' should simply iterate over the layerRequests and let them do their jobs, e.g.:
                //   layerRequest.startRequest(promise, opts, true/false).
                EarthServerGenericClient.getCoverageWMS(promise, responseData, WMSurl, WMScoverID, WMSCRS, WMSImageFormat, BoundingBox, WMSversion, ResX, ResZ, timespan, transparent);
                break;
            case 'WCS':
                var WCSurl = layerRequest.urls[0];
                var WCScoverID = layerRequest.id;
                var WCSCRS = layerRequest.crs;
                var WCSMimeType = layerRequest.format;
                var WCSDataType = layerRequest.datatype;
                var WCSOutputFormat = layerRequest.format;
                var WCSOutputCRS = layerRequest.outputCRS;
                var BoundingBox = opts.bbox;
                var WCSVersion = layerRequest.version;
                var ResX = opts.resX;
                var ResZ = opts.resZ;
                var timespan = opts.timespan;

                // FIXXME: get rid of the plethora of parameters and replace them with a single 'opts' object
                EarthServerGenericClient.getCoverageWCS(promise, responseData, WCSurl, WCScoverID, BoundingBox, WCSVersion, WCSMimeType, WCSDataType, WCSOutputFormat, ResX, ResZ, WCSOutputCRS);
                break;
            default:
                console.log('[EarthServerGenericClient.performRequests] protocol "' + layerRequest.protocol + '"" not supported');
                break;
        }
    }
};

/**
 * Requests an image via WMS and a dem via WCS.
 * @param callback - Module requesting this data.
 * @param BoundingBox - Bounding box of the area, used in both WMS and WCS requests.
 * @param ResX - Width of the response image via WMS.
 * @param ResY - Height of the response image via WMS.
 * @param WMSurl - URL of the WMS service.
 * @param WMScoverID - Layer ID used in WMS.
 * @param WMSversion - Version of the WMS service.
 * @param WMSCRS - The Coordinate Reference System. (Should be like: "crs=1")
 * @param WMSImageFormat - Image format for the WMS response.
 * @param WCSurl - URL of the WCS service.
 * @param WCScoverID - Coverage ID used in WCS.
 * @param WCSVersion - Version of the WCS service.
 * @param WCSFormat - Format of the WCS response.
 */
EarthServerGenericClient.requestWMSImageWCSDem = function(callback,BoundingBox,ResX,ResY,WMSurl,WMScoverID,WMSversion,WMSCRS,WMSImageFormat,WCSurl,WCScoverID,WCSVersion,WCSMimeType,WCSDataType,WCSOutputFormat,WCSOutputCRS,timespan)
{
    var responseData = new EarthServerGenericClient.ServerResponseData();
    var combine = new EarthServerGenericClient.combinedCallBack(callback,2);

    EarthServerGenericClient.getCoverageWMS(combine,responseData,WMSurl,WMScoverID,WMSCRS,WMSImageFormat,BoundingBox,WMSversion,ResX,ResY,timespan);
    EarthServerGenericClient.getCoverageWCS(combine,responseData,WCSurl,WCScoverID,BoundingBox,WCSVersion,WCSMimeType,WCSDataType,WCSOutputFormat,ResX,ResY,WCSOutputCRS);
};

/**
 * Requests an image via WMS and a dem via WCPS.
 * @param callback - Module requesting this data.
 * @param BoundingBox - Bounding box of the area, used in both WMS and WCS requests.
 * @param ResX - Width of the response image via WMS.
 * @param ResY - Height of the response image via WMS.
 * @param WMSurl - URL of the WMS service.
 * @param WMScoverID - Layer ID used in WMS.
 * @param WMSversion - Version of the WMS service.
 * @param WMSCRS - The Coordinate Reference System. (Should be like: "crs=1")
 * @param WMSImageFormat - Image format for the WMS response.
 * @param WCPSurl - URL for the WCPS Query
 * @param WCPSquery - WCPS DEM Query
 */
EarthServerGenericClient.requestWMSImageWCPSDem = function( callback,BoundingBox,ResX,ResY,WMSurl,WMScoverID,WMSversion,WMSCRS,WMSImageFormat,WCPSurl,WCPSquery)
{
    var responseData = new EarthServerGenericClient.ServerResponseData();
    var combine = new EarthServerGenericClient.combinedCallBack(callback,2);

    EarthServerGenericClient.getCoverageWMS(combine,responseData,WMSurl,WMScoverID,WMSCRS,WMSImageFormat,BoundingBox,WMSversion,ResX,ResY);
    EarthServerGenericClient.getWCPSDemCoverage(combine,responseData,WCPSurl,WCPSquery);
};

EarthServerGenericClient.requestWCPSImages = function(callback, URLWCPS, WCPSQuery)
{
    var combine = new EarthServerGenericClient.combinedCallBack(callback,WCPSQuery.length,true);
    var responseDataArray = [];

    for(var o=0; o< WCPSQuery.length;o++)
    {
        responseDataArray.push( new EarthServerGenericClient.ServerResponseData() );
        responseDataArray[o].validateHeightMap = false; // no height map will be received
    }

    for(var i=0; i< WCPSQuery.length;i++)
    {
        EarthServerGenericClient.getWCPSImage(combine,responseDataArray[i],URLWCPS,WCPSQuery[i],false);
    }
};

/**
 * TODO:
 * @param callback
 * @param WCSurl
 * @param WCSversion
 * @param WCScoverID
 * @param minx
 * @param maxx
 * @param miny
 * @param maxy
 * @param minh
 * @param maxh
 */
EarthServerGenericClient.requestWCSPointCloud = function(callback,WCSurl,WCSversion,WCScoverID,minx,maxx,miny,maxy,minh,maxh)
{
    var data = new EarthServerGenericClient.ServerResponseData;
    data.validateHeightMap = false;
    data.validateTexture = false;
    data.validatePointCloud = true;

    EarthServerGenericClient.getPointCloudWCS(callback,data,WCSurl,WCSversion,WCScoverID,minx,maxx,miny,maxy,minh,maxh);

};
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Abstract base class for terrains.
 * @constructor
 */
EarthServerGenericClient.AbstractTerrain = function()
{
    /**
     * Stores the created appearances' names.
     * @type {Array}
     */
    var AppearanceDefined = [];

    /**
     * @ignore Empty default stub for nexFrame() function.
     */
    this.nextFrame = function()
    {};

    /**
     * Clears the list of already defined appearances.
     */
    this.clearDefinedAppearances = function()
    {
        AppearanceDefined = [];
    };

    /**
     * Stores the IDs of the materials to change the transparency.
     * @type {Array}
     */
    this.materialNodes = [];//Stores the IDs of the materials to change the transparency.

    /**
     * Deletes all saved material IDs. Use this function if you remove old material from the dom.
     * E.g. for ProgressiveTerrain.
     */
    this.clearMaterials = function()
    {
        this.materialNodes = [];
    };

    /**
     * Creates a html canvas element out of the texture and removes the alpha values.
     * @param texture - Texture to draw. Can be everything which can be rendered into a canvas.
     * @param index - Index of the model using this canvas. Used to give the canvas a unique ID.
     * @param noData - NoData sets all pixels with the RGB value that is the same NODATA to fully transparent.
     * @param removeAlphaChannel - Flag if the alpha channel of the image should be set to be fully opaque.
     *  texture No Data Value is found in the texture.
     * @returns {HTMLElement} The canvas element.
     */
    this.createCanvas = function(texture,index,noData,removeAlphaChannel)
    {
        var canvasTmp = document.createElement('canvas');
        var checkScaledData = false;

        if( texture !== undefined && texture.width > 0 && texture.height > 0)
        {
            canvasTmp.style.display = "none";
            canvasTmp.width  = texture.width;
            canvasTmp.height = texture.height;

            var context = canvasTmp.getContext('2d');
            context.drawImage(texture, 0,0, canvasTmp.width, canvasTmp.height);

            var imageData = context.getImageData(0, 0, canvasTmp.width, canvasTmp.height);

            if(noData !== undefined && noData.length >2) // nodata RGB values are set:
            {
                checkScaledData = true;
                for (var k=0;k<imageData.data.length;k+=4)
                {
                    if(imageData.data[k] === noData[0] && imageData.data[k+1] === noData[1] && imageData.data[k+2] === noData[2])
                    {   imageData.data[k+3]=0;    } // nodata value, so set transparent
                    else
                    {   imageData.data[k+3]=255;    }// other value, so set fully opaque
                }
                context.putImageData(imageData,0,0);
            }
            if( removeAlphaChannel) // nodata is not defined: set the alpha value of all pixels to fully opaque.
            {
                for (var i=0;i<imageData.data.length;i+=4)
                {
                    imageData.data[i+3]=255;
                }
                context.putImageData(imageData,0,0);
            }

            var canvasTexture = document.createElement('canvas');
            canvasTexture.style.display = "none";
            canvasTexture.setAttribute("id", "EarthServerGenericClient_Canvas"+index);
            canvasTexture.width  = Math.pow(2, Math.round(Math.log(texture.width)  / Math.log(2)));
            canvasTexture.height = Math.pow(2, Math.round(Math.log(texture.height) / Math.log(2)));

            // Check max texture size
            var maxTextureSize = x3dom.caps.MAX_TEXTURE_SIZE;
            if( canvasTexture.width  > maxTextureSize) canvasTexture.width  = maxTextureSize;
            if( canvasTexture.height > maxTextureSize) canvasTexture.height = maxTextureSize;

            var canvasContext = canvasTexture.getContext('2d');
            canvasContext.drawImage(canvasTmp,0,0,canvasTexture.width,canvasTexture.height);

            if( checkScaledData)
            {
                var scaledContext = canvasTexture.getContext('2d');
                var scaledData = scaledContext.getImageData(0, 0, canvasTexture.width, canvasTexture.height);
                for (var o=0;o<scaledData.data.length;o+=4)
                {
                    if(scaledData.data[o+3] != 0)
                        scaledData.data[o+3]=255;
                }
                scaledContext.putImageData(scaledData,0,0);
            }

        }

        return canvasTexture;
    };

    /**
     * Returns a string with the color values in RGBA of one side.
     * @param side - Which side.
     * @param width - Desired with.
     * @param height - Desired height.
     * @returns {string} - String with RGBA color values.
     */
    this.getColorSlide = function(side,width,height)
    {
        var slide = "";
        var xPos = 0;
        var yPos = 0;
        var xSize = 1;
        var ySize = 1;

        switch(side)
        {
            case 0: ySize = this.data.texture.height;
                    break;
            case 1: xSize = this.data.texture.width;
                    break;
            case 2: xSize = this.data.texture.width;
                    yPos = this.data.texture.height -1;
                    break;
            case 3: ySize = this.data.texture.height;
                    xPos = this.data.texture.width -1;
        }

        if(this.data.texture === undefined)
        {
            console.log("EarthServerGenericClient.AbstractTerrain: No texture.")
        }
        else
        {

            var newCanvas = document.createElement("canvas");
            newCanvas.style.display = "none";
            newCanvas.width  = this.data.texture.width;
            newCanvas.height = this.data.texture.height;
            var context = newCanvas.getContext('2d');
            context.drawImage(this.data.texture, 0,0, newCanvas.width, newCanvas.height);

            var data = context.getImageData(xPos,yPos,xSize,ySize);
            var length = data.data.length;

            for(var k=0; k< length; k=k+4)
            {
                slide = slide + (data.data[k]/255) + " ";
                slide = slide + (data.data[k+1]/255) + " ";
                slide = slide + (data.data[k+2]/255) + " ";
                slide = slide + (1) + " ";

                slide = slide + (data.data[k]/255) + " ";
                slide = slide + (data.data[k+1]/255) + " ";
                slide = slide + (data.data[k+2]/255) + " ";
                slide = slide + (1) + " ";
            }
        }

        return slide;
    };

    /**
     * Function to create one side panel. Normally called by the createSidePanels():
     * @param domElement - Transform node of the model.
     * @param side - Side of the panel.
     * @param width - Number of vertices of the side panel on the x axis.
     * @param height - Number of vertices of the side panel on the z axis.
     * @param xPos - Starting position of the side panel on the x axis.
     * @param yPos - Starting position of the side panel on the z axis.
     * @param spacing - Spacing of the model's shapes.
     * @param modelTrans - Model transformation on the y axis
     * @param modelScale - Models scale on the y axis
     */
    this.createOneSidePanel = function (domElement,side,width,height,xPos,yPos,spacing,modelTrans,modelScale)
    {
        var trans = document.createElement("transform");
        trans.setAttribute("scale","" + spacing + " 1 " + spacing);
        var shape = document.createElement('shape');
        var faceSet = document.createElement('IndexedFaceSet');
        faceSet.setAttribute("solid","false");

        //Color
        var color = document.createElement("colorRGBA");
        color.setAttribute("color", this.getColorSlide(side,width,height) );

        var info = {};
        info.chunkWidth = width;
        info.chunkHeight = height;
        info.xpos = xPos;
        info.ypos = yPos;

        var coords = document.createElement('Coordinate');
        var index = "0 1 3 2 -1 "; // vertex index for the first quad
        var points="";
        var bottom = ((-EarthServerGenericClient.MainScene.getCubeSizeY()/2.0) - parseFloat(modelTrans) ) / parseFloat(modelScale);
        var heightData = this.getHeightMap(info);

        // add vertices and indices for the quads
        for(var y=0; y<height;y++)
        {
            for(var x=0; x<width;x++)
            {
                points = points + (xPos+x) + " " + heightData[y][x] + " " + (yPos+y) +" ";
                points = points + (xPos+x) + " " + bottom + " " + (yPos+y) + " ";
                if(y+x!==0 && y+x< height+width -2)
                {
                    var mult = (x+y)*2;
                    index = index + (mult+1) + " " + mult + " " + (mult+2) + " " + (mult+3) + " -1 ";
                }
            }
        }

        faceSet.setAttribute("coordindex",index);
        coords.setAttribute("point", points);

        faceSet.appendChild(coords);
        faceSet.appendChild(color);
        shape.appendChild(faceSet);
        trans.appendChild(shape);
        domElement.appendChild(trans);

        trans = null;
        shape = null;
        faceSet = null;
        color = null;
        coords = null;
        index = null;
        points = null;
    };

    /**
     * Creates side panels for a models's terrain.
     * @param domElement - Transform node of the model.
     * @param spacing - The terrain's shapes spacing value.
     */
    this.createSidePanels = function(domElement,spacing)
    {
        if(this.data.texture === undefined) return;

        var modelScale = domElement.getAttribute("scale");
        modelScale = modelScale.split(" ");
        modelScale = modelScale[1];
        var modelTrans = domElement.getAttribute("translation");
        modelTrans = modelTrans.split(" ");
        modelTrans = modelTrans[1];

        this.createOneSidePanel(domElement,0,1,this.data.height,0,0,spacing,modelTrans,modelScale);
        this.createOneSidePanel(domElement,1,this.data.width,1,0,0,spacing,modelTrans,modelScale);
        this.createOneSidePanel(domElement,2,this.data.width,1,0,this.data.height-1,spacing,modelTrans,modelScale);
        this.createOneSidePanel(domElement,3,1,this.data.height,this.data.width-1,0,spacing,modelTrans,modelScale);

    };

    /**
     * Calculates the needed numbers of chunks for the terrain for a specific chunk size.
     * @param width - Width of the entire terrain.
     * @param height - Height of the entire terrain.
     * @param chunkSize - The size of one chunk.
     * @returns {} numChunksX: number, numChunksY: number, numChunks: number
     */
    this.calcNumberOfChunks = function(width,height,chunkSize)
    {
        var chunksInfo = {
            numChunksX: parseInt(width/chunkSize),
            numChunksY: parseInt(height/chunkSize),
            numChunks: 0
        };

        if(width%chunkSize!==0)
        {   chunksInfo.numChunksX++;  }


        if(height%chunkSize!==0)
        {   chunksInfo.numChunksY++;  }

        chunksInfo.numChunks = parseInt(chunksInfo.numChunksY*chunksInfo.numChunksX);
        return chunksInfo;
    };

    /**
     * This function calcs the needed information to build and place a chunk of a terrain.
     * @param index - Index of the model using the terrain. Used for creating IDs.
     * @param chunkSize - The desired size (count of values) of one chunk per axis.
     * @param chunkInfo - This parameter uses an object that will be returned by calcNumberOfChunks().
     *      It contains the information about a terrain and its chunks (e.g. number of chunks on each axis).
     * @param currentChunk - The index of the current chunk to be build.
     * @param terrainWidth - Width of the whole terrain. Used to calc texture coordinates.
     * @param terrainHeight - Height of the whole terrain. Used to calc texture coordinates.
     * @returns {}
     *      xpos: number, ypos: number, chunkWidth: number,
     *      chunkHeight: number, terrainWidth: number,
     *      terrainHeight: number, ID: number, modelIndex: number
     */
    this.createChunkInfo = function(index,chunkSize,chunkInfo,currentChunk,terrainWidth,terrainHeight)
    {
        var info = {
            xpos:parseInt(currentChunk%chunkInfo.numChunksX)*(chunkSize-1),
            ypos:parseInt(currentChunk/chunkInfo.numChunksX)*(chunkSize-1),
            chunkWidth:0,
            chunkHeight:0,
            terrainWidth: terrainWidth,
            terrainHeight: terrainHeight,
            ID: currentChunk,
            modelIndex: index
        };

        if( currentChunk%chunkInfo.numChunksX === (chunkInfo.numChunksX-1) )
        {   info.chunkWidth = terrainWidth - parseInt((chunkInfo.numChunksX-1)*(chunkSize-1));   }
        else
        {   info.chunkWidth = chunkSize;   }

        if( currentChunk >= chunkInfo.numChunks - chunkInfo.numChunksX)
        {   info.chunkHeight = terrainHeight - parseInt((chunkInfo.numChunksY-1)*(chunkSize-1)); }
        else
        {   info.chunkHeight = chunkSize  }

        return info;
    };

    /**
     * Returns a height map part from the given height map specified in the info parameter.
     * @param info - Which part of the heightmap should be returned.
     *      info.chunkHeight, info.chunkWidth, info.xpos & info.ypos
     * @returns {*}
     */
    this.getHeightMap = function(info)
    {
        try
        {
            var heightmapPart = new Array(info.chunkHeight);
            for(var i=0; i<info.chunkHeight; i++)
            {
                heightmapPart[i] = new Array(info.chunkWidth);
                for(var j=0; j<info.chunkWidth; j++)
                {
                    //If the requested position is out of bounce return the min value of the hm.
                    if(i > this.data.height || j > this.data.width || info.xpos+j < 0 || info.ypos+i <0)
                    {
                        heightmapPart[i][j] = this.data.minHMvalue;
                    }
                    else
                    {   heightmapPart[i][j] = this.data.heightmap[info.xpos+j][info.ypos+i];    }
                }
            }
            return heightmapPart;
        }
        catch(error)
        {
            console.log('AbstractTerrain::getHeightMap(): ' + error);
            return null;
        }
    };

    /**
     * Collects all material nodes of the terrain and changes each transparency attribute.
     * @param value - Transparency value between 0 (full visible) and 1 (invisible).
     */
    this.setTransparency = function(value)
    {
        for(var k=0;k<this.materialNodes.length;k++)
        {
            var mat =  document.getElementById(this.materialNodes[k]);
            if( mat !== null)
            {
                mat.setAttribute("transparency",value);
                // get parent appearance
                var app = mat.parentNode;
                if(app != null)
                {
                    if( value === 0)
                    {   app.setAttribute('sortType', 'opaque'); }
                    else
                    {   app.setAttribute('sortType', 'transparent'); }

                    // get parent shape
                    var shape = app.parentNode;
                    if( shape != null)
                    {
                        if( value == 1) // if shape is fully transparent, set rendering to false
                        {   shape.setAttribute("render","false");   }
                        else
                        {   shape.setAttribute("render","true");   }
                    }
                }
            }
            else
            {   console.log("Material with ID " +this.materialNodes[k] + " not found.");    }
        }
    };

    /**
     * Sets the number of drawn elements of the terrain.
     * The materials of the elements render flag are altered.
     * @param numberElements - Number of elements to be drawn.
     * @param focusElement - Element which has to be drawn, all other elements around this are next.
     */
    this.setDrawnElements = function(numberElements,focusElement)
    {
        var addOne =0;
        if( numberElements % 2 == 1)
        {   addOne =1; }

        var start = focusElement - parseInt(numberElements / 2)-addOne;
        var add = 0;
        if( start < 0)
        {
            add = 0 - start;
            start = 0;
        }
        var end = focusElement + parseInt(numberElements / 2) + add;
        if( end > this.materialNodes.length )
        {   end = this.materialNodes.length;  }

        for(var k=0;k<this.materialNodes.length;k++)
        {
            var mat =  document.getElementById(this.materialNodes[k]);
            if( mat !== null)
            {
                // get parent appearance
                var app = mat.parentNode;
                app = app.parentNode;
                if(k>=start && k < end)
                    app.setAttribute('render', 'true');
                else
                    app.setAttribute('render', 'false');
            }
            else
            {   console.log("Material with ID " +this.materialNodes[k] + " not found.");    }
        }
    };

    /**
     * This function handles the creation and usage of the appearances. It can be called for every shape or LOD that should use a canvasTexture.
     * It returns the amount of appearances specified. For every name only one appearance exits, every other uses it.
     * @param AppearanceName - Name of the appearance. If this name is not set in the array, it will be registered.
     *      In the case the name is already set, the existing one will be used.
     * @param AppearanceCount - Number of appearance to be created. E.g. the LODs use a bunch of three appearance nodes.
     * @param modelIndex - Index of the model using this appearance.
     * @param canvasTexture - Canvas element to be used in the appearance as texture.
     * @param transparency - Transparency of the appearance.
     * @param specular - Specular color of the appearance.
     * @param diffuse - Diffuse color of the appearance.
     * @param upright - Flag if the terrain is upright (underground data) and the texture stands upright in the cube.
     * @returns {Array} - Array of appearance nodes. If any error occurs, the function will return null.
     */
    this.getAppearances = function (AppearanceName, AppearanceCount, modelIndex, canvasTexture, transparency,specular,diffuse,upright) {
        try {
            var appearances = [AppearanceCount];
            for (var i = 0; i < AppearanceCount; i++) {
                var appearance = document.createElement('Appearance');

                if( transparency === 0)
                {   appearance.setAttribute('sortType', 'opaque'); }
                else
                {   appearance.setAttribute('sortType', 'transparent'); }

                if (AppearanceDefined[AppearanceName] != undefined)//use the already defined appearance
                {
                    appearance.setAttribute("use", AppearanceDefined[AppearanceName]);
                }
                else    //create a new appearance with the given parameter
                {
                    AppearanceDefined[AppearanceName] = AppearanceName;
                    appearance.setAttribute("id", AppearanceDefined[AppearanceName]);
                    appearance.setAttribute("def", AppearanceDefined[AppearanceName]);

                    // maybe only color
                    if( canvasTexture != undefined)
                    {
                        var texture = document.createElement('Texture');
                        texture.setAttribute('hideChildren', 'true');
                        texture.setAttribute("repeatS", 'true');
                        texture.setAttribute("repeatT", 'true');
                        texture.setAttribute("scale","false");
                        texture.appendChild(canvasTexture);

                        var imageTransform = document.createElement('TextureTransform');
                        imageTransform.setAttribute("scale", "1,-1");
                        if(upright)
                        {   imageTransform.setAttribute("rotation", "-1.57");   }
                    }

                    var material = document.createElement('material');
                    material.setAttribute("specularColor", specular);
                    material.setAttribute("diffuseColor", diffuse);
                    material.setAttribute('transparency', transparency);
                    material.setAttribute('ID',AppearanceName+"_mat");
                    //Save this material ID to change transparency during runtime
                    this.materialNodes.push( AppearanceName+"_mat");

                    appearance.appendChild(material);
                    // only add if created
                    if( canvasTexture !== undefined)
                    {
                        appearance.appendChild(imageTransform);
                        appearance.appendChild(texture);
                    }

                    texture = null;
                    imageTransform = null;
                    material = null;
                }
                appearances[i] = appearance;
            }
            return appearances;
        }
        catch (error) {
            console.log('EarthServerGenericClient::AbstractTerrain::getAppearances(): ' + error);
            return null;
        }
    };

    /**
     * Returns the Width of the Heightmap of the terrain.
     * @returns {number}
     */
    this.getHeightmapWidth = function()
    {   return this.data.width; };

    /**
     * Returns the Height of the Heightmap of the terrain.
     * @returns {number}
     */
    this.getHeightmapHeight = function()
    {   return this.data.height; };

    /**
     * Returns the elevation value of the height map at a specific point in the 3D scene.
     * All transformations and scales are considered.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height on the y-axis.
     */
    this.getHeightAt3DPosition = function(xPos,zPos)
    {
        var value = 0;
        var transform = document.getElementById("EarthServerGenericClient_modelTransform"+this.index);
        if(transform && this.data.heightmap)
        {
            var translations = transform.getAttribute("translation");
            translations = translations.split(" ");
            var scales = transform.getAttribute("scale");
            scales = scales.split(" ");

            var xValue = (xPos - translations[0]) / scales[0];
            var zValue = (zPos - translations[2]) / scales[2];

            value = parseFloat( this.data.heightmap[ parseInt(xValue) ][ parseInt(zValue) ] * scales[1] ) + parseFloat(translations[1]);
        }
        else
        {   console.log("AbstractTerrain::getHeightAt3DPosition: Can't find model transform for index " + this.index); }

        return value;
    };

    /**
     * Returns the dem value of the height map at a specific point in the 3D scene.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height of the dem.
     */
    this.getDemValueAt3DPosition = function(xPos,zPos)
    {
        var value = 0;
        var transform = document.getElementById("EarthServerGenericClient_modelTransform"+this.index);
        if(transform && this.data.heightmap)
        {
            var translations = transform.getAttribute("translation");
            translations = translations.split(" ");
            var scales = transform.getAttribute("scale");
            scales = scales.split(" ");

            var xValue = (xPos - translations[0]) / scales[0];
            var zValue = (zPos - translations[2]) / scales[2];

            value = parseFloat( this.data.heightmap[ parseInt(xValue) ][ parseInt(zValue) ] );
        }
        else
        {   console.log("AbstractTerrain::getDemValueAt3DPosition: Can't find model transform for index " + this.index); }

        return value;
    };
};





/**
 * @class This terrain should receive multiple insertLevel calls. It removes the old version
 * and replace it with the new data. It can be used for progressive loading.
 * Example: WCPSDemAlpha with progressive loading using the progressiveWCPSImageLoader.
 * @augments EarthServerGenericClient.AbstractTerrain
 * @param index - Index of the model using this terrain.
 * @constructor
 */
EarthServerGenericClient.ProgressiveTerrain = function(index)
{
    this.index = index;

    /**
     * General information about the amount of chunks needed to build the terrain.
     * @type {Object}
     */
    var chunkInfo;
    /**
     * Size of one chunk. Chunks at the borders can be smaller.
     * 256*256 (2^16) is the max size because of only 16 bit indices.
     * @type {number}
     */
    var chunkSize = 121;
    /**
     * The canvas that holds the received image.
     * @type {HTMLElement}
     */
    this.canvasTexture;
    /**
     * Counter of the inserted levels.
     * @type {number}
     */
    var currentData = 0;

    /**
     * Counter for the insertion of chunks.
     * @type {number}
     */
    var currentChunk =0;

    /**
     * Insert one data level into the scene. The old elevation grid will be removed and one new build.
     * @param root - Dom Element to append the terrain to.
     * @param data - Received Data of the Server request.
     * @param noDataValue - Array with the RGB values to be considered as no data available and shall be drawn transparent.
     * @param noDemValue - The single value in the DEM that should be considered as NODATA
     */
    this.insertLevel = function(root,data,noDataValue,noDemValue)
    {
        this.data = data;
        this.root = root;
        this.noData = noDataValue;
        this.noDemValue = noDemValue;
        this.canvasTexture = this.createCanvas(data.texture,index,noDataValue,data.removeAlphaChannel);
        chunkInfo     = this.calcNumberOfChunks(data.width,data.height,chunkSize);

        //Remove old Materials of the deleted children
        this.clearMaterials();

        for(currentChunk=0; currentChunk< chunkInfo.numChunks; currentChunk++)
        {
            EarthServerGenericClient.MainScene.enterCallbackForNextFrame( this.index );
        }
        currentChunk =0;
        currentData++;
        //chunkInfo = null;

        EarthServerGenericClient.MainScene.reportProgress(index);
    };

    /**
     * The Scene Manager calls this function after a few frames since the last insertion of a chunk.
     */
    this.nextFrame = function()
    {
        try
        {
            //Build all necessary information and values to create a chunk
            var info = this.createChunkInfo(this.index,chunkSize,chunkInfo,currentChunk,this.data.width,this.data.height);
            var hm = this.getHeightMap(info);
            var appearance = this.getAppearances("TerrainApp_"+this.index+"_"+currentData,1,
                this.index,this.canvasTexture,this.data.transparency,this.data.specularColor,this.data.diffuseColor);

            var transform = document.createElement('Transform');
            transform.setAttribute("translation", info.xpos + " 0 " + info.ypos);
            transform.setAttribute("scale", "1.0 1.0 1.0");

            if( this.noData !== undefined || this.noDemValue != undefined)
            {   new GapGrid(transform,info, hm, appearance,this.noDemValue); }
            else
            {   new ElevationGrid(transform,info, hm, appearance); }

            this.root.appendChild(transform);

            currentChunk++;
            //Delete vars avoid circular references
            info = null;
            hm = null;
            appearance = null;
            transform = null;
        }
        catch(error)
        {
            alert('Terrain::CreateNewChunk(): ' + error);
        }
    };
};
EarthServerGenericClient.ProgressiveTerrain.inheritsFrom( EarthServerGenericClient.AbstractTerrain);


/**
 * @class This terrain builds up a LOD with 3 levels of the received data.
 * @param root - Dom Element to append the terrain to.
 * @param data - Received Data of the Server request.
 * @param index - Index of the model that uses this terrain.
 * @param noDataValue - Array with the RGB values to be considered as no data available and shall be drawn transparent.
 * @param noDemValue - The single value in the DEM that should be considered as NODATA
 * @augments EarthServerGenericClient.AbstractTerrain
 * @constructor
 */
EarthServerGenericClient.LODTerrain = function(root, data,index,noDataValue,noDemValue)
{
    this.materialNodes = [];//Stores the IDs of the materials to change the transparency.
    this.data = data;
    this.index = index;
    this.noData = noDataValue;
    this.noDemValue = noDemValue;

    /**
     * Distance to change between full and 1/2 resolution.
     * @type {number}
     */
    var lodRange1       = 5000;
    /**
     * Distance to change between 1/2 and 1/4 resolution.
     * @type {number}
     */
    var lodRange2       = 17000;

    /**
     * The canvas that holds the received image.
     * @type {HTMLElement}
     */
    this.canvasTexture   = this.createCanvas( data.texture,index,noDataValue,data.removeAlphaChannel);

    /**
     * Size of one chunk. Chunks at the borders can be smaller.
     * We want to build 3 chunks for the LOD with different resolution but the same size on the screen.
     * With 121 values the length of the most detailed chunk is 120.
     * The second chunk has 61 values and the length of 60. With a scale of 2 it's back to the size of 120.
     * The third chunk has 31 values and the length if 30. With a scale of 4 it's also back to the size 120.
     * @type {number}
     */
    var chunkSize = 121;
    /**
     * General information about the number of chunks needed to build the terrain.
     * @type {number}
     */
    var chunkInfo       = this.calcNumberOfChunks(data.width,data.height,chunkSize);

    /**
     * Counter for the insertion of chunks.
     * @type {number}
     */
    var currentChunk    = 0;

    /**
     * Builds the terrain and appends it into the scene.
     */
    this.createTerrain= function()
    {
        for(currentChunk=0; currentChunk< chunkInfo.numChunks;currentChunk++)
        {
            EarthServerGenericClient.MainScene.enterCallbackForNextFrame( this.index );
        }
        currentChunk=0;
        //chunkInfo = null;

        EarthServerGenericClient.MainScene.reportProgress(index);
    };

    /**
     * The Scene Manager calls this function after a few frames since the last insertion of a chunk.
     */
    this.nextFrame = function()
    {
        try
        {
            //Build all necessary information and values to create a chunk
            var info = this.createChunkInfo(this.index,chunkSize,chunkInfo,currentChunk,data.width,data.height);
            var hm = this.getHeightMap(info);
            var appearance = this.getAppearances("TerrainApp_"+index,3,index,this.canvasTexture,
                data.transparency,this.data.specularColor,this.data.diffuseColor);

            var transform = document.createElement('Transform');
            transform.setAttribute("translation", info.xpos + " 0 " + info.ypos);
            transform.setAttribute("scale", "1.0 1.0 1.0");

            var lodNode = document.createElement('LOD');
            lodNode.setAttribute("Range", lodRange1 + ',' + lodRange2);
            lodNode.setAttribute("id", 'lod' + info.ID);

            if( this.noData !== undefined || this.noDemValue != undefined)
            {   new GapGrid(lodNode,info, hm, appearance,this.noDemValue); }
            else
            {   new ElevationGrid(lodNode,info, hm, appearance);  }

            transform.appendChild(lodNode);
            root.appendChild(transform);

            currentChunk++;
            //Delete vars avoid circular references
            info = null;
            hm = null;
            appearance = null;
            transform = null;
            lodNode = null;
        }
        catch(error)
        {
            alert('Terrain::CreateNewChunk(): ' + error);
        }
    };
};
EarthServerGenericClient.LODTerrain.inheritsFrom( EarthServerGenericClient.AbstractTerrain);

/**
 * @class This terrain builds a plane with sharad data.
 * @param root - Dom Element to append the terrain to.
 * @param data - Received Data of the Server request.
 * @param index - Index of the model that uses this terrain.
 * @param noData - Array with RGB value to be considered NODATA and shall be transparent.
 * @param coordinates - Coordinates of the single data points.
 * @param area - Area of interest in which the sharad data points are inserted.
 * @augments EarthServerGenericClient.AbstractTerrain
 * @constructor
 */
EarthServerGenericClient.SharadTerrain = function(root,data,index,noData,coordinates,area)
{
    this.materialNodes = [];//Stores the IDs of the materials to change the transparency.
    this.data = data;
    this.index = index;

    /**
     * The canvas that holds the received image.
     * @type {HTMLElement}
     */
   this.canvasTexture   = this.createCanvas( data.texture,index,noData,data.removeAlphaChannel);

    /**
     * Builds the terrain and appends it into the scene.
     */
    this.createTerrain = function()
    {
        var appearance = this.getAppearances("TerrainApp_"+this.index,1,this.index,this.canvasTexture,
            data.transparency,this.data.specularColor,this.data.diffuseColor,true);
        var shape = document.createElement("shape");

        var indexedFaceSet = document.createElement('IndexedFaceSet');
        indexedFaceSet.setAttribute("colorPerVertex", "false");

        indexedFaceSet.setAttribute("solid","false");
        var coords = document.createElement('Coordinate');
        var points= "";
        var index = "";

        // No coordinates specified. Create simple plane
        if(coordinates === undefined || area.minx === undefined || area.miny === undefined || area.maxx === undefined || area.maxy === undefined)
        {
            var sizeX = this.canvasTexture.width;
            var sizeZ = this.canvasTexture.height;

            index = "0 1 2 3 -1";
            var p = {};
            p[0] = "0 0 0 ";
            p[1] = "0 0 "+ sizeZ + " ";
            p[2] = ""+ sizeX    + " 0 " + sizeZ + " ";
            p[3] = ""+ sizeX    + " 0 0";

            for(var i=0; i<4;i++)
            {   points = points+p[i];   }
        }
        else // Coordinates are specified. Build one face for every data point
        {
            // Set first quad index
            index = "0 1 3 2 -1 ";
            var height = Math.pow(2, Math.round(Math.log(data.texture.height)/Math.log(2)));
            if( height > x3dom.caps.MAX_TEXTURE_SIZE) height = x3dom.caps.MAX_TEXTURE_SIZE;

            // add vertices and indices for the quads
            for(var k=0; k<coordinates.length;k++)
            {
                // Get geo position of the data point
                var x = coordinates[k][0];
                var y = coordinates[k][1];
                // Transform them into cube coordinates
                var pos   = EarthServerGenericClient.MainScene.getCubePositionForPoint(this.index,x,y,area);


                if(pos.valid)
                {
                    // Add position to points
                    points = points + (pos.x) + " " + (pos.y+height) + " " + (pos.z) +" ";
                    points = points + (pos.x) + " " + (pos.y) + " " + (pos.z) + " ";
                    if(k!==0 && k<coordinates.length-1)
                    {
                        var mult = k*2;
                        index = index + (mult+1) + " " + mult + " " + (mult+2) + " " + (mult+3) + " -1 ";
                    }
                }
            }
        }

        coords.setAttribute("point", points);
        indexedFaceSet.setAttribute("coordindex",index);
        indexedFaceSet.appendChild(coords);
        shape.appendChild(appearance[0]);
        shape.appendChild(indexedFaceSet);

        root.appendChild(shape);

        shape = null;
        indexedFaceSet = null;
        appearance = null;
        coords = null;

        EarthServerGenericClient.MainScene.reportProgress(this.index);
    };


};
EarthServerGenericClient.SharadTerrain.inheritsFrom( EarthServerGenericClient.AbstractTerrain);

/**
 * Terrain to display multiple layers.
 * @param root - Dom Element to append the terrain to.
 * @param dataArray - Received Data array of the Server requests.
 * @param index - Index of the model that uses this terrain.
 * @param noDataValue - No Data Value
 * @constructor
 */
EarthServerGenericClient.VolumeTerrain = function(root,dataArray,index,noDataValue)
{
    this.materialNodes = [];//Stores the IDs of the materials to change the transparency.
    this.data = dataArray;
    this.index = index;
    this.noData = noDataValue;
    this.appearances = [];  // appearances of the layers
    this.canvasTextures = []; // canvas textures of the layers
    this.focus = 0;//parseInt( dataArray.length / 2 ) +1;

    //create canvas textures and appearances
    for(var i=0; i<dataArray.length;i++)
    {
        this.canvasTextures.push( this.createCanvas( dataArray[i].texture,index,noDataValue,dataArray[i].removeAlphaChannel) );
        this.appearances.push( this.getAppearances("TerrainApp_"+this.index+i,1,this.index,this.canvasTextures[i],
            dataArray[i].transparency,dataArray[i].specularColor,dataArray[i].diffuseColor) );
    }

    // create planes with textures
    for(i=0; i<dataArray.length;i++)
    {
        var shape,transform,grid, coordsNode;

        transform = document.createElement("transform");
        transform.setAttribute("translation","0 "+ i +" 0");

        shape = document.createElement('Shape');
        shape.setAttribute("id",this.index+"_shape_"+i+"_"+0);

        coordsNode = document.createElement('Coordinate');
        coordsNode.setAttribute("point", "0 0 0 1 0 0 1 0 1 0 0 1");

        grid = document.createElement('IndexedFaceSet');
        grid.setAttribute("solid", "false");
        grid.setAttribute("colorPerVertex", "false");

        grid.setAttribute("coordIndex", "0 1 2 3 -1");
        grid.appendChild( coordsNode );

        shape.appendChild(this.appearances[i][0]);
        shape.appendChild(grid);
        transform.appendChild(shape);

        root.appendChild(transform);

        // set vars null
        shape = null;
        grid = null;
        transform = null;
        coordsNode = null;

        EarthServerGenericClient.MainScene.reportProgress(this.index);
    }

    this.updateMaxShownElements = function(value)
    {
        this.setDrawnElements(value,this.focus);
    };
};
EarthServerGenericClient.VolumeTerrain.inheritsFrom( EarthServerGenericClient.AbstractTerrain);

/**
 * Terrain to display multiple layers.
 * @param root - Dom Element to append the terrain to.
 * @param data - Received Data of the Server request.
 * @param index - Index of the model that uses this terrain.
 * @param pointSize - Size of the points.
 * @constructor
 */
EarthServerGenericClient.PointCloudTerrain = function(root,data,index,pointSize)
{
    this.materialNodes = [];//Stores the IDs of the materials to change the transparency.
    this.appearance = null;  // appearance
    this.data = data;
    this.index = index;
    this.pointSize = parseFloat(pointSize);
    this.transparencyFieldID = "EarthServerGenericClient_model_"+index+"_transparencyField";
    this.pointSizeFieldID    = "EarthServerGenericClient_model_"+index+"_pointSizeField";

    this.createTerrain = function()
    {
        // create material
        this.appearance = document.createElement("Appearance");

        // create shape,PointSet, etc.
        var shape = document.createElement("Shape");
        var pointSet = document.createElement("PointSet");
        pointSet.setAttribute("solid","false");
        var coords = document.createElement("coordinate");
        coords.setAttribute("point", data.pointCloudCoordinates);

        pointSet.appendChild(coords);
        this.appendShader( this.appearance);
        shape.appendChild(this.appearance);
        shape.appendChild(pointSet);
        root.appendChild(shape);

        coords = null;
        pointSet = null;
        shape = null;
        this.appearance = null;

        EarthServerGenericClient.MainScene.reportProgress(index);
    };

    this.appendShader = function(domElement)
    {
        var cShader = document.createElement("composedShader");
        var field1  = document.createElement("field");
        field1.setAttribute("name","matCol");
        field1.setAttribute("type","SFVec3f");
        field1.setAttribute("value",data.diffuseColor);
        cShader.appendChild(field1);
        var field2  = document.createElement("field");
        field2.setAttribute("id", this.transparencyFieldID);
        field2.setAttribute("name","transparency");
        field2.setAttribute("type","SFFloat");
        field2.setAttribute("value",String(1.0 - data.transparency) );
        cShader.appendChild(field2);
        var field3  = document.createElement("field");
        field3.setAttribute("id", this.pointSizeFieldID);
        field3.setAttribute("name","pointSize");
        field3.setAttribute("type","SFFloat");
        field3.setAttribute("value",String(this.pointSize.toFixed(2)) );
        cShader.appendChild(field3);

        var vertexCode = "attribute vec3 position; \n";
        vertexCode += "uniform mat4 modelViewProjectionMatrix; \n";
        vertexCode += "uniform mat4 projectionMatrix; \n";
        vertexCode += "varying vec3 fPosition; \n";
        vertexCode += "varying vec3 fNormal; \n";
        vertexCode += "uniform float pointSize; \n";
        vertexCode += "void main() { \n";
        vertexCode += "fPosition = position; \n";
        vertexCode += "gl_Position = modelViewProjectionMatrix * vec4(position, 1.0); \n";
        vertexCode += "gl_PointSize = pointSize; } \n";

        /*var vertexCode = "precision highp float; \n";
        vertexCode += "attribute vec3 position; \n";
        vertexCode += "attribute vec3 normal; \n";
        vertexCode += "uniform mat4 modelViewMatrix; \n";
        vertexCode += "uniform mat4 projectionMatrix; \n";
        vertexCode += "varying vec3 fPosition; \n";
        vertexCode += "void main() \n";
        vertexCode += "{ \n";
        vertexCode += "vec4 pos = modelViewMatrix * vec4(position, 1.0); \n";
        vertexCode += "gl_PointSize = " + pointSize.toFixed(2) +"; \n";
        vertexCode += "fPosition = pos; \n";
        vertexCode += "gl_Position = projectionMatrix * pos;} \n";*/

        var shaderPartVertex = document.createElement("shaderPart");
        shaderPartVertex.setAttribute("type","VERTEX");
        shaderPartVertex.innerHTML = vertexCode;
        cShader.appendChild(shaderPartVertex);

        var fragmentCode = "#ifdef GL_FRAGMENT_PRECISION_HIGH \n";
        fragmentCode += "precision highp float; \n";
        fragmentCode += "#else \n";
        fragmentCode += "precision mediump float; \n";
        fragmentCode += "#endif \n";
        fragmentCode += "uniform vec3 matCol; \n";
        fragmentCode += "uniform float transparency; \n";
        fragmentCode += "void main() { \n";
        fragmentCode += "gl_FragColor = vec4(matCol, transparency); } \n";

        /*var fragmentCode = "#ifdef GL_FRAGMENT_PRECISION_HIGH \n";
        fragmentCode += "precision highp float; \n";
        fragmentCode += "#else \n";
        fragmentCode += "precision mediump float; \n";
        fragmentCode += "#endif \n";
        fragmentCode += "uniform vec2 resolution; \n";
        fragmentCode += "varying vec3 fPosition; \n";
        fragmentCode += "void main() { \n";
        fragmentCode += "float k = (fPosition.z) / (5.0); \n";
        fragmentCode += "vec2 ss = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y/resolution.y); \n";
        fragmentCode += "gl_FragColor = vec4(ss, k, 1.0); \n";
        //fragmentCode += "if (length(ss - vec2(0.5)) > 10.55) \n";
        //agmentCode += "discard; \n";
        fragmentCode += "} \n";*/


        var shaderPartFragment = document.createElement("shaderPart");
        shaderPartFragment.setAttribute("type","FRAGMENT");
        shaderPartFragment.innerHTML = fragmentCode;
        cShader.appendChild(shaderPartFragment);

        domElement.appendChild( cShader );

        cShader = null;
        field1 = null;
        shaderPartVertex = null;
        shaderPartFragment = null;
    };

    /**
     * Overwrites function from base terrain class. Sets the transparency in the shader.
     * @param value - Transparency value between 0 (full visible) and 1 (invisible).
     */
    this.setTransparency = function(value)
    {
        var transparencyField = document.getElementById( this.transparencyFieldID);

        if( transparencyField )
            transparencyField.setAttribute("value", String(1.0-value) );
        else
            console.log("EarthServerGenericClient.PointCloudTerrain: Can't find transparency field.")
    };

    /**
     * Sets the size of the drawn points.
     * @param value - Size if the points.
     */
    this.setPointSize = function(value)
    {
        var pointSizeField = document.getElementById( this.pointSizeFieldID );

        if( pointSizeField)
            pointSizeField.setAttribute("value", String(value));
        else
            console.log("EarthServerGenericClient.PointCloudTerrain: Can't find point size field.")
    }
};
EarthServerGenericClient.PointCloudTerrain.inheritsFrom( EarthServerGenericClient.AbstractTerrain);
//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * Creates the basic UI
 * @param domElementID - Dom element to append the UI to.
 */
EarthServerGenericClient.createBasicUI = function(domElementID)
{
    var UI_DIV = document.getElementById(domElementID);
    if( !UI_DIV )
    {
        alert("Can't find DomElement for UI with ID " +domElementID);
        return;
    }

    //Create Divs for all scene models
    for(var i=0; i<EarthServerGenericClient.MainScene.getModelCount();i++)
    {
        var name = document.createElement("h3");
        name.innerHTML = EarthServerGenericClient.MainScene.getModelName(i);
        var div = document.createElement("div");
        //Set IDs
        name.setAttribute("id","EarthServerGenericClient_ModelHeader_"+i);
        div.setAttribute("id","EarthServerGenericClient_ModelDiv_"+i);

        UI_DIV.appendChild(name);
        UI_DIV.appendChild(div);

        EarthServerGenericClient.appendXYZSlider(div,"Model"+i+"X","X Translation",i,0,
            -EarthServerGenericClient.MainScene.getCubeSizeX(),EarthServerGenericClient.MainScene.getCubeSizeX(),
            EarthServerGenericClient.MainScene.getModelOffsetX(i) * EarthServerGenericClient.MainScene.getCubeSizeX(),
            EarthServerGenericClient.MainScene.updateOffset);

        /*
        Note about the sliders: The cube is using X and Z axis is base and Y as height.
        While this is standard in computer graphics it can confuse users.
        Because of this the labels on Y and Z are switched.
         */

        EarthServerGenericClient.appendXYZSlider(div,"Model"+i+"Z","Y Translation",i,2,
            -EarthServerGenericClient.MainScene.getCubeSizeZ(),EarthServerGenericClient.MainScene.getCubeSizeZ(),
            EarthServerGenericClient.MainScene.getModelOffsetZ(i) * EarthServerGenericClient.MainScene.getCubeSizeZ(),
            EarthServerGenericClient.MainScene.updateOffset);

        EarthServerGenericClient.appendXYZSlider(div,"Model"+i+"Y","Z Translation",i,1,
            -EarthServerGenericClient.MainScene.getCubeSizeY(),EarthServerGenericClient.MainScene.getCubeSizeY(),
            EarthServerGenericClient.MainScene.getModelOffsetY(i) * EarthServerGenericClient.MainScene.getCubeSizeY(),
            EarthServerGenericClient.MainScene.updateOffset);

        EarthServerGenericClient.appendAlphaSlider(div,i);
        EarthServerGenericClient.MainScene.setSpecificElement(i,div);

        div=null;
    }

    //Create Div for the Cameras
    var Cam = document.createElement("h3");
    Cam.innerHTML = "Cameras";
    var cdiv = document.createElement("div");
    var cp   = document.createElement("p");

    for(i=0; i< EarthServerGenericClient.MainScene.getCameraDefCount();i++)
    {
        var button = document.createElement('button');
        var cameraDef = EarthServerGenericClient.MainScene.getCameraDef(i);
        cameraDef = cameraDef.split(":");
        button.setAttribute("onclick", "EarthServerGenericClient.MainScene.setView('"+cameraDef[1]+"');return false;");
        button.innerHTML = cameraDef[0];

        cp.appendChild(button);
        button = null;
    }
    cdiv.appendChild(cp);
    UI_DIV.appendChild(Cam);
    UI_DIV.appendChild(cdiv);

    cdiv=null;
    cp=null;

    //Create Div Reset
    var reset = document.createElement("h3");
    reset.innerHTML = "Reset";
    var rdiv = document.createElement("div");
    var rp   = document.createElement("p");

    var rbutton = document.createElement('button');
    rbutton.setAttribute("onclick", "EarthServerGenericClient.MainScene.resetScene();return false;");
    rbutton.innerHTML = "RESET";

   rp.appendChild(rbutton);
   rbutton = null;

    rdiv.appendChild(rp);
    UI_DIV.appendChild(reset);
    UI_DIV.appendChild(rdiv);

    rdiv=null;
    rp=null;

    //Create Divs for a Light sources
    for(i=0; i<EarthServerGenericClient.MainScene.getLightCount();i++)
    {
        var lightHeader = document.createElement("h3");
        lightHeader.innerHTML = "Light " + i;
        var lightDiv = document.createElement("div");

        UI_DIV.appendChild(lightHeader);
        UI_DIV.appendChild(lightDiv);

        /*
         Note about the sliders: The cube is using X and Z axis is base and Y as height.
         While this is standard in computer graphics it can confuse users.
         Because of this the labels on Y and Z are switched.
         */

        EarthServerGenericClient.appendXYZSlider(lightDiv,"Light"+i+"X","X Translation",i,0,
            -EarthServerGenericClient.MainScene.getCubeSizeX(),EarthServerGenericClient.MainScene.getCubeSizeX(),0,
            EarthServerGenericClient.MainScene.updateLightPosition);

        EarthServerGenericClient.appendXYZSlider(lightDiv,"Light"+i+"Z","Y Translation",i,2,
            -EarthServerGenericClient.MainScene.getCubeSizeZ(),EarthServerGenericClient.MainScene.getCubeSizeZ(),0,
            EarthServerGenericClient.MainScene.updateLightPosition);

        EarthServerGenericClient.appendXYZSlider(lightDiv,"Light"+i+"Y","Z Translation",i,1,
            -EarthServerGenericClient.MainScene.getCubeSizeY(),EarthServerGenericClient.MainScene.getCubeSizeY(),0,
            EarthServerGenericClient.MainScene.updateLightPosition);

        EarthServerGenericClient.appendGenericSlider(lightDiv,"Light"+i+"R","Radius",i,0,5000,500,
            EarthServerGenericClient.MainScene.updateLightRadius);

        EarthServerGenericClient.appendGenericSlider(lightDiv,"Light"+i+"I","Intensity",i,0,5,1,
            EarthServerGenericClient.MainScene.updateLightIntensity);

        lightDiv=null;
        lightHeader=null;
    }

    // Create Div for the Annotations
    if( EarthServerGenericClient.MainScene.getAnnotationLayerCount() )
    {
        var Anno = document.createElement("h3");
        Anno.innerHTML = "Annotations";
        var adiv = document.createElement("div");

        for(i=0; i< EarthServerGenericClient.MainScene.getAnnotationLayerCount();i++)
        {
            var ap   = document.createElement("p");

            var ALname = EarthServerGenericClient.MainScene.getAnnotationLayerName(i);
            ap.innerHTML= ALname + ": ";
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            checkbox.setAttribute("checked","checked");
            checkbox.setAttribute("onchange","EarthServerGenericClient.MainScene.drawAnnotationLayer('"+ALname+"',this.checked)");
            ap.appendChild(checkbox);
            //Build list with annotations in this layer
            var list = document.createElement("ul");
            var annotationTexts = EarthServerGenericClient.MainScene.getAnnotationLayerTexts(ALname);
            for(var k=0; k<annotationTexts.length;k++)
            {
                var entry = document.createElement("li");
                entry.innerHTML = annotationTexts[k];
                list.appendChild(entry);
                entry = null;
            }

            ap.appendChild(list);
            adiv.appendChild(ap);
            ap = null;
            checkbox = null;
            list = null;
        }

        UI_DIV.appendChild(Anno);
        UI_DIV.appendChild(adiv);

        adiv=null;
        ap=null;
    }
    $( "#"+domElementID ).accordion({
        heightStyle: "content",
        collapsible: true
    });

    UI_DIV = null;
};

/**
 * Destroys the basic UI.
 */
EarthServerGenericClient.destroyBasicUI = function(domElementID)
{
    var elem = $( "#"+domElementID );
    if (elem) {
        try {
            elem.accordion( "destroy" );
        } catch (err) {
            console.log('[EarthServerGenericClient.destroyBasicUI] Trying to destroy non initialized Accordion. Catched and good to continue...');
        }
    }
};

/**
 * Appends a axis slider to a UI element. Axis sliders call the callback function with an ID,axis and their value.
 * @param domElement - Append the slider to this dom element.
 * @param sliderID - Dom ID for this slider.
 * @param label - Label (displayed in the UI) for this slider
 * @param elementID - First parameter for the callback function. Change the element with this ID.
 * @param axis - Axis this slider should effect. 0:x 1:y 2:z
 * @param min - Minimum value of this slider.
 * @param max - Maximum value of this slider.
 * @param startValue - Start value of this slider.
 * @param callback - Callback function, every time the slider is moved this function will be called.
 */
EarthServerGenericClient.appendXYZSlider = function(domElement,sliderID,label,elementID,axis,min,max,startValue,callback)
{
    var p = document.createElement("p");
    p.innerHTML = label;
    domElement.appendChild(p);

    var slider = document.createElement("div");
    slider.setAttribute("id",sliderID);
    domElement.appendChild(slider);

    $( "#"+sliderID ).slider({
        range: "max",
        min: min,
        max: max,
        value: startValue,
        slide: function( event, ui ) {
            callback(elementID,axis,ui.value);
        }
    });
};

/**
 * Generic sliders are calling their callback function with an element ID and their value.
 * @param domElement - Append the slider to this dom element.
 * @param sliderID - Dom ID for this slider.
 * @param label - Label (displayed in the UI) for this slider
 * @param elementID - First parameter for the callback function. Change the module with this ID.
 * @param min - Minimum value of this slider.
 * @param max - Maximum value of this slider.
 * @param startValue - Start value of this slider.
 * @param callback - Callback function, every time the slider is moved this function will be called.
 */
EarthServerGenericClient.appendGenericSlider = function(domElement,sliderID,label,elementID,min,max,startValue,callback)
{
    var p = document.createElement("p");
    p.innerHTML = label;
    domElement.appendChild(p);

    var slider = document.createElement("div");
    slider.setAttribute("id",sliderID);
    domElement.appendChild(slider);

    $( "#"+sliderID ).slider({
        range: "max",
        min: min,
        max: max,
        value: startValue,
        slide: function( event, ui ) {
            callback(elementID,ui.value);
        }
    });

};

/**
 * Special slider for setting the transparency of scene models.
 * @param domElement - Append the slider to this dom element.
 * @param moduleNumber - Index of the scene model.
 */
EarthServerGenericClient.appendAlphaSlider = function(domElement, moduleNumber){
    //AlphaChannel
    var ap = document.createElement("p");
    ap.setAttribute("id","EarthServerGenericClient_SliderCell_a_" + moduleNumber );
    ap.innerHTML = "Transparency: ";
    domElement.appendChild(ap);

    //jQueryUI Slider
    var Aslider = document.createElement("div");
    Aslider.setAttribute("id","aSlider_"+moduleNumber);
    domElement.appendChild(Aslider);

    $( "#aSlider_"+moduleNumber ).slider({
        range: "max",
        min: 0,
        max: 100,
        value: EarthServerGenericClient.MainScene.getModelTransparency(moduleNumber)*100,
        slide: function( event, ui ) {
            EarthServerGenericClient.MainScene.updateTransparency(moduleNumber,parseFloat(ui.value/100));
        }
    });

};

/**
 * Special slider for setting the elevation of scene models.
 * @param domElement - Append the slider to this dom element.
 * @param moduleNumber - Index of the scene model.
 */
EarthServerGenericClient.appendElevationSlider = function(domElement,moduleNumber){

    var ep = document.createElement("p");
    ep.setAttribute("id","EarthServerGenericClient_SliderCell_e_" + moduleNumber );
    ep.innerHTML = "Elevation: ";
    domElement.appendChild(ep);

    //jQueryUI Slider
    var Eslider = document.createElement("div");
    Eslider.setAttribute("id","eSlider_"+moduleNumber);
    domElement.appendChild(Eslider);

    $( "#eSlider_"+moduleNumber ).slider({
        range: "max",
        min: 0,
        max: 100,
        value: 10,
        slide: function( event, ui ) {
            EarthServerGenericClient.MainScene.updateElevation(moduleNumber,ui.value);
        }
    });

};

EarthServerGenericClient.appendMaxShownElementsSlider = function(domElement,moduleNumber,maxElements)
{
    var ep = document.createElement("p");
    ep.setAttribute("id","EarthServerGenericClient_SliderCell_me_" + moduleNumber );
    ep.innerHTML = "DrawnElements: ";
    domElement.appendChild(ep);

    //jQueryUI Slider
    var Eslider = document.createElement("div");
    Eslider.setAttribute("id","meSlider_"+moduleNumber);
    domElement.appendChild(Eslider);

    $( "#meSlider_"+moduleNumber ).slider({
        range: "max",
        min: 1,
        max: maxElements,
        value: parseInt(maxElements/2),
        slide: function( event, ui ) {
            EarthServerGenericClient.MainScene.updateMaxShownElements(moduleNumber,ui.value);
        }
    });
};

/**
 * @class The default progress bar to display the progress in loading and creating the scene models.
 * @param DivID
 */
EarthServerGenericClient.createProgressBar =  function(DivID)
{
    $( "#"+DivID ).progressbar({ value: 0, max: 100 });
    $( "#"+DivID ).on( "progressbarcomplete", function( event, ui ) {
        $( "#"+DivID ).toggle( "blind" );
    } );

    /**
     * Updates the value in the progress bar.
     * @param value - New value
     */
    this.updateValue = function(value)
    {
        $( "#"+DivID ).progressbar( "option", "value", value );
    };
};


//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Abstract base class for visualisation tools.
 * @constructor
 */
EarthServerGenericClient.AbstractVisualisation = function()
{
    var posX = 0;
    var posY = 0;
    var maxX = 0;
    var maxY = 0;
    var minX = 0;
    var minY = 0;
    var axis = "x";
    var size = 50;

    this.setSize = function(newSize)
    {
        if( newSize > 0)
        {   size = newSize; }
        else
        {   console.log("EarthServerGenericClient.AbstractVisualisation::setSize: A value smaller than 0 not allowed.");    }
    };
    this.getSize = function()
    {   return size;    };

    this.setBoundaries = function(minx,maxx,miny,maxy)
    {
        minX = minx;
        minY = miny;
        maxX = maxx;
        maxY = maxy;
    };

    this.move = function(deltaX,deltaY)
    {
        if( posX+deltaX >= minX && posX+deltaX <maxX)
        {   posX = posX+deltaX; }

        if( posY+deltaY >= minY && posY+deltaY <maxY)
        {   posY = posY+deltaY; }

        this.updateVisualisation(posX,posY);
    };

    this.moveTo = function(xVal,yVal)
    {
        if( xVal > minX && xVal < maxX)
        {   posX  = xVal;   }

        if( yVal > minY && yVal < maxY)
        {   posY = yVal;    }

        this.updateVisualisation(posX,posY);
    };

    this.getPosX = function()
    {   return posX;    };
    this.getPosY = function()
    {   return posY;    };

    this.setAxis = function(newAxis)
    {
        if(newAxis !== "x" && newAxis !== "y" && newAxis !== "z")
        {   console.log("EarthServerGenericClient.AbstractVisualisation::setAxis: Can't set Axis. Has to be 'x','y' or 'z'.");}
        else
        {   axis = newAxis; }
    };
    this.getAxis = function()
    {   return axis;    };

    this.createImageTexture = function(width,height,imageData,canvasID)
    {
        this.canvasTexture = null;

        if( imageData !== undefined || width <= 0 || height <= 0)
        {
            this.canvasTexture = document.createElement('canvas');
            this.canvasTexture.style.display = "none";
            this.canvasTexture.setAttribute("id",canvasID);
            this.canvasTexture.width = width;
            this.canvasTexture.height = height;

            var context = this.canvasTexture.getContext('2d');
            context.putImageData(imageData,0,0);
        }
        else
        {   console.log("EarthServerGenericClient.AbstractVisualisation: Could not create Canvas."); }

        return this.canvasTexture;
    };

    this.updateCanvas = function(newImageData)
    {
        if( this.canvas)
        {
            var context = canvas.getContext('2d');
            context.putImageData(newImageData,0,0);
        }
        else
        {   console.log("EarthServerGenericClient.AbstractVisualisation: Could not find Canvas.");    }
    };

    this.rawDataToPixelData = function(rawData,hmMin,hmMax)
    {
        var pixels = this.canvas.width*this.canvasTexture.height*4;
        var pixelData = [pixels];

        //Draw complete white first
        for(var i=0; i<pixels;i++)
        {
            pixelData[i]=255;
        }
        //Draw heightmap into the white canvas
        for(i=0; i<rawData.length;i++)
        {
            var height = 0;
        }
    }
};

/**
 * @class
 * @constructor
 * @augments EarthServerGenericClient.AbstractVisualisation
 */
EarthServerGenericClient.HeightProfileVisualisation = function(index,getHeightmapFunction,size,hmWidth,hmHeight,axis,hmMin,hmMax)
{
    this.setSize(size);
    this.setBoundaries(0,hmWidth,0,hmHeight);
    this.move(hmWidth/2,hmHeight/2);
    this.setAxis(axis);

    this.updateVisualisation = function(posX,posY)
    {
        var info = {};
        info.xpos = posX;
        info.ypos = posY;
        if( this.getAxis() === "x")
        {
            info.chunkHeight = 1;
            info.chunkWidth  = this.getSize();
        }
        else
        {
            info.chunkHeight = this.getSize();
            info.chunkWidth  = 1;
        }

        var rawData   = getHeightmapFunction(info);
        var pixelData = rawDataToPixelData(rawData,hmMin,hmMax);
    }
};
EarthServerGenericClient.HeightProfileVisualisation.inheritsFrom( EarthServerGenericClient.AbstractVisualisation);