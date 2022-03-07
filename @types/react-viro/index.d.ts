
declare module 'react-viro' {
// Imports
import { Component } from "react";

/* ##### DEPRECATION WARNING - ViroSceneNavigator may be removed in future releases. Use ViroVRSceneNavigator instead #####
ViroSceneNavigator is used to transition between multiple scenes. */
interface ViroSceneNavigatorProps {
	/* Calling vrModeEnabled allows switching to and from VR mode.
	When set to false, it transitions back to pre-VR (mono) mode.
	When set to true, we set thie view into a full VR mode.
	This is set to true by default. */
	vrModeEnabled?:boolean
	/* A flag to enable/disable some debug features */
	debug?:boolean
	apiKey:string
	/* ViroSceneNavigator uses "scene" objects like the following to
	describe a scene. */
	initialScene:{ scene:Function }
	/* Called when either the user physically decides to exit vr (hits
	the "X" buton). */
	onExitViro?:Function
	viroAppProps?:any
}
export class ViroSceneNavigator extends Component<ViroSceneNavigatorProps> {
	public getRandomTag():any;
	/* Pushes a scene and reference it with the given key if provided.
	If the scene has been previously pushed, we simply show the scene again.
	Note that the back history order of which scenes were pushed is preserved.
	Also note that scenes are reference counted and only a unique set of
	scenes are stored and mapped to within sceneDictionary.
	
	Can take in either 1 or two parameters in the form:
	push ("sceneKey");
	push ("sceneKey", scene);
	push (scene); */
	public push(param1:any, param2:any):any;
	/* Replace the top scene in the stack with the given scene. The remainder of the back
	history is kept in the same order as before.
	
	Can take in either 1 or two parameters in the form:
	replace ("sceneKey");
	replace ("sceneKey", scene);
	replace (scene); */
	public replace(param1:any, param2:any):any;
	/* Jumps to a given scene that had been previously pushed. If the scene was not pushed, we
	then push and jump to it. The back history is re-ordered such that jumped to scenes are
	re-ordered to the front. As such, only the back order of sequential jumps are preserved.
	
	Can take in either 1 or two parameters in the form:
	jump ("sceneKey");
	jump ("sceneKey", scene);
	jump (scene); */
	public jump(param1:any, param2:any):any;
	public pop():any;
	public popN(n:number):any;
	/* Increments the reference count for a scene within sceneDictionary that is
	mapped to the given sceneKey. If no scenes are found / mapped, we create
	one, initialize it with a reference count of 1, and store it within the
	sceneDictionary for future reference. */
	public incrementSceneReference(scene:any, scenekey:string, limitOne:boolean):any;
	/* Decrements the reference count for the last N scenes within
	the sceneHistory by 1. If nothing else references that given scene
	(counts equals 0), we then remove that scene from sceneDictionary. */
	public decrementReferenceForLastNScenes(n:any):any;
	/* Adds the given sceneKey to the sceneHistory and updates the currentSceneIndex to point
	to the scene on the top of the history stack (the most recent scene). */
	public addToHistory(sceneKey:string):any;
	/* Instead of preserving history, we find the last pushed sceneKey within the history stack
	matching the given sceneKey and re-order it to the front. We then update the
	currentSceneIndex to point to the scene on the top of the history stack
	(the most recent scene). */
	public reorderHistory(sceneKey:string):any;
	public popHistoryByN(n:any):any;
	public getSceneIndex(sceneTag:any):any;
}

interface ViroSceneProps {
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onPlatformUpdate?:Function
	onCameraTransformUpdate?:Function
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	/* Describes the acoustic properties of the room around the user */
	soundRoom?:{ size:number[], wallMaterial?:string, ceilingMaterial?:string, floorMaterial?:string }
	physicsWorld?:{ gravity:number[], drawBounds?:boolean }
	postProcessEffects?:string[]
}
export class ViroScene extends Component<ViroSceneProps> {
	public findCollisionsWithRayAsync(from:any, to:any, closest:any, viroTag:any):Promise<any>;
	public findCollisionsWithShapeAsync(from:any, to:any, shapeString:any, shapeParam:any, viroTag:any):Promise<any>;
	/* ##### DEPRECATION WARNING - this prop may be removed in future releases ##### */
	public getCameraPositionAsync():Promise<any>;
	public getCameraOrientationAsync():Promise<any>;
}

interface ViroBoxProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	width?:number
	height?:number
	length?:number
	materials?:string[] | string
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onTransformUpdate?:Function
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Enables high accuracy event collision checks for this object.
	This can be useful for complex 3D objects where the default
	checking method of bounding boxes do not provide adequate
	collision detection coverage.
	
	NOTE: Enabling high accuracy event collision checks has a high
	performance cost and should be used sparingly / only when
	necessary.
	
	Flag is set to false by default. */
	highAccuracyEvents?:boolean
	highAccuracyGaze?:boolean
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroBox extends Component<ViroBoxProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

export const ViroMaterials:any;

interface ViroMaterialVideoProps {
	material?:string
	paused?:boolean
	loop?:boolean
	muted?:boolean
	volume?:number
	/* Callback invoked when the underlying video component begins buffering. Called at
	least once at the beginning of playback/video creation. */
	onBufferStart?:Function
	/* Callback invoked when the underlying video component has finished buffering. */
	onBufferEnd?:Function
	/* Callback that is called when the video is finished playing. This
	function isn't called at the end of a video if looping is enabled. */
	onFinish?:Function
	/* Callback that is called when the current playback position has changed.
	This is called in the form:
	    onUpdateTime(currentPlaybackTimeInSeconds, totalPlayBackDurationInSeconds); */
	onUpdateTime?:Function
	/* Callback triggered when the video fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
}
export class ViroMaterialVideo extends Component<ViroMaterialVideoProps> {
	public setNativeProps(nativeProps:any):any;
	public seekToTime(timeInSeconds:any):any;
}

interface ViroVideoProps {
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	renderingOrder?:number
	visible?:boolean
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	highAccuracyEvents?:boolean
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	onTransformUpdate?:Function
	stereoMode?:'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop' | 'None'
	width?:number
	height?:number
	paused?:boolean
	loop?:boolean
	muted?:boolean
	volume?:number
	source:{ uri?:string } | number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Callback invoked when the underlying video component begins buffering. Called at
	least once at the beginning of playback/video creation. */
	onBufferStart?:Function
	/* Callback invoked when the underlying video component has finished buffering. */
	onBufferEnd?:Function
	/* Callback that is called when the video is finished playing. This
	function isn't called at the end of a video if looping is enabled. */
	onFinish?:Function
	/* Callback that is called when the current playback position has changed.
	This is called in the form:
	    onUpdateTime(currentPlaybackTimeInSeconds, totalPlayBackDurationInSeconds); */
	onUpdateTime?:Function
	/* Callback triggered when the video fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroVideo extends Component<ViroVideoProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public seekToTime(timeInSeconds:any):any;
}

/* Used to render a 360 video on the background sphere. */
interface Viro360VideoProps {
	/* The video uri to play */
	source:{ uri?:string } | number
	rotation?:number[]
	paused?:boolean
	loop?:boolean
	muted?:boolean
	volume?:number
	/* Callback invoked when the underlying video component begins buffering. Called at
	least once at the beginning of playback/video creation. */
	onBufferStart?:Function
	/* Callback invoked when the underlying video component has finished buffering. */
	onBufferEnd?:Function
	/* Callback that is called when the video is finished playing. This
	function isn't called at the end of a video if looping is enabled. */
	onFinish?:Function
	/* Callback that is called when the current playback position has changed.
	This is called in the form:
	    onUpdateTime(currentPlaybackTimeInSeconds, totalPlayBackDurationInSeconds); */
	onUpdateTime?:Function
	/* Callback triggered when the video fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
	stereoMode?:'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop' | 'None'
}
export class Viro360Video extends Component<Viro360VideoProps> {
	public setNativeProps(nativeProps:any):any;
	public seekToTime(timeInSeconds:any):any;
}

/* Absolute container for Viro Controls */
interface ViroNodeProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroNode extends Component<ViroNodeProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

/* Frame that serves as a 'window' into a ViroPortal */
interface ViroPortalProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroPortal extends Component<ViroPortalProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

/* Portal container for revealing different sections of the scene graph. */
interface ViroPortalSceneProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onPortalEnter?:Function
	onPortalExit?:Function
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	viroTag?:string
	onCollision?:Function
	passable?:boolean
}
export class ViroPortalScene extends Component<ViroPortalSceneProps> {
	public setNativeProps(nativeProps:any):any;
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
}

interface ViroCameraProps {
	position?:number[]
	rotation?:number[]
	active:boolean
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	fieldOfView?:number
}
export class ViroCamera extends Component<ViroCameraProps> {
	public setNativeProps(nativeProps:any):any;
}

interface ViroOrbitCameraProps {
	position?:number[]
	focalPoint?:number[]
	active:boolean
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	fieldOfView?:number
}
export class ViroOrbitCamera extends Component<ViroOrbitCameraProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroSphere */
interface ViroSphereProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	widthSegmentCount?:number
	heightSegmentCount?:number
	radius?:number
	facesOutward?:boolean
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	onTransformUpdate?:Function
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Enables high accuracy event collision checks for this object.
	This can be useful for complex 3D objects where the default
	checking method of bounding boxes do not provide adequate
	collision detection coverage.
	
	NOTE: Enabling high accuracy event collision checks has a high
	performance cost and should be used sparingly / only when
	necessary.
	
	Flag is set to false by default. */
	highAccuracyEvents?:boolean
	highAccuracyGaze?:boolean
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroSphere extends Component<ViroSphereProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, atPosition:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroImage */
interface ViroImageProps {
	/* The image file, which is required */
	source:{ uri?:string } | number
	/* The position of the card */
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	width?:number
	height?:number
	resizeMode?:'ScaleToFill' | 'ScaleToFit' | 'StretchToFill'
	imageClipMode?:'None' | 'ClipToBounds'
	stereoMode?:'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop' | 'None'
	materials?:string[] | string
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, allowInterruptable?:boolean }
	transformBehaviors?:string[] | string
	highAccuracyEvents?:boolean
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	style?:any
	placeholderSource?:{ uri?:string } | number
	placeHolderSource?:{ uri?:string } | number
	mipmap?:boolean
	format?:'RGBA8' | 'RGB565'
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Callback triggered when we are processing the assets to be
	displayed in this ViroImage (either downloading / reading from file). */
	onLoadStart?:Function
	/* Callback triggered when we have finished processing assets to be
	displayed. Wether or not assets were processed successfully and
	thus displayed will be indicated by the parameter "success".
	For example:
	
	  _onLoadEnd(event:Event){
	     // Indication of asset loading success
	     event.nativeEvent.success
	  } */
	onLoadEnd?:Function
	/* Callback triggered when the image fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroImage extends Component<ViroImageProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a 360 image in a sphere. */
interface Viro360ImageProps {
	/* The image file, which is required */
	source:{ uri?:string } | number
	rotation?:number[]
	format?:'RGBA8' | 'RGB565'
	stereoMode?:'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop' | 'None'
	/* Callback triggered when we are processing the assets to be
	displayed in this 360 Photo (either downloading / reading from file). */
	onLoadStart?:Function
	/* Callback triggered when we have finished processing assets to be
	displayed. Wether or not assets were processed successfully and
	thus displayed will be indicated by the parameter "success".
	For example:
	
	  _onLoadEnd(event:Event){
	     // Indication of asset loading success
	     event.nativeEvent.success
	  } */
	onLoadEnd?:Function
	/* Callback triggered when the image fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
	isHdr?:boolean
}
export class Viro360Image extends Component<Viro360ImageProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a skybox as a scene background. */
interface ViroSkyBoxProps {
	/* The source cube map. Either this or a color must be specified. */
	source?:any
	color?:any
	format?:'RGBA8' | 'RGB565'
	/* Callback triggered when we are processing the assets to be
	displayed in this 360 Photo (either downloading / reading from file). */
	onLoadStart?:Function
	/* Callback triggered when we have finished processing assets to be
	displayed. Wether or not assets were processed successfully and
	thus displayed will be indicated by the parameter "success".
	For example:
	
	  _onLoadEnd(event:Event){
	     // Indication of asset loading success
	     event.nativeEvent.success
	  } */
	onLoadEnd?:Function
}
export class ViroSkyBox extends Component<ViroSkyBoxProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a Viro3DObject */
interface Viro3DObjectProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	materials?:string[] | string
	transformBehaviors?:string[] | string
	type:'OBJ' | 'VRX' | 'GLTF' | 'GLB'
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	onTransformUpdate?:Function
	source:{ uri?:string } | number
	resources?:{ uri?:string } | number[]
	animation?:{ name?:string, delay?:number, duration?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	renderingOrder?:number
	visible?:boolean
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onLoadStart?:Function
	onLoadEnd?:Function
	onError?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Enables high accuracy event collision checks for this object.
	This can be useful for complex 3D objects where the default
	checking method of bounding boxes do not provide adequate
	collision detection coverage.
	
	NOTE: Enabling high accuracy event collision checks has a high
	performance cost and should be used sparingly / only when
	necessary.
	
	Flag is set to false by default. */
	highAccuracyEvents?:boolean
	highAccuracyGaze?:boolean
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class Viro3DObject extends Component<Viro3DObjectProps> {
	public setNativeProps(nativeProps:any):any;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
}

/* Used to render a ViroAnimatedComponent */
interface ViroAnimatedComponentProps {
	animation?:string
	delay?:number
	loop?:boolean
	onStart?:Function
	onFinish?:Function
	run?:boolean
}
export class ViroAnimatedComponent extends Component<ViroAnimatedComponentProps> {
	public setNativeProps(nativeProps:any):any;
}

export const ViroAnimations:any;

/* Used to render a ViroDirectionalLight */
interface ViroDirectionalLightProps {
	color?:any
	intensity?:number
	temperature?:number
	direction:number[]
	influenceBitMask?:number
	castsShadow?:boolean
	shadowOpacity?:number
	shadowOrthographicSize?:number
	shadowOrthographicPosition?:number[]
	shadowMapSize?:number
	shadowBias?:number
	shadowNearZ?:number
	shadowFarZ?:number
}
export class ViroDirectionalLight extends Component<ViroDirectionalLightProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroAmbientLight */
interface ViroAmbientLightProps {
	color?:any
	intensity?:number
	temperature?:number
	influenceBitMask?:number
}
export class ViroAmbientLight extends Component<ViroAmbientLightProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroOmniLight */
interface ViroOmniLightProps {
	position?:number[]
	color?:any
	intensity?:number
	temperature?:number
	influenceBitMask?:number
	attenuationStartDistance?:number
	attenuationEndDistance?:number
}
export class ViroOmniLight extends Component<ViroOmniLightProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroSpotLight */
interface ViroSpotLightProps {
	position?:number[]
	color?:any
	intensity?:number
	temperature?:number
	direction:number[]
	attenuationStartDistance?:number
	attenuationEndDistance?:number
	innerAngle?:number
	outerAngle?:number
	influenceBitMask?:number
	castsShadow?:boolean
	shadowOpacity?:number
	shadowMapSize?:number
	shadowBias?:number
	shadowNearZ?:number
	shadowFarZ?:number
}
export class ViroSpotLight extends Component<ViroSpotLightProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroFlexView */
interface ViroFlexViewProps {
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	width?:number
	height?:number
	style?:any
	backgroundColor?:any
	renderingOrder?:number
	visible?:boolean
	materials?:string[] | string
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onTransformUpdate?:Function
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroFlexView extends Component<ViroFlexViewProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

export const ViroUtils:any;

export const ViroProps:any;

/* Used to render a ViroText */
interface ViroTextProps {
	position?:number[]
	rotation?:number[]
	text:string
	rotationPivot?:number[]
	color?:any
	extrusionDepth?:number
	outerStroke?:{ type?:'None' | 'Outline' | 'DropShadow', width?:number, color?:any }
	width?:number
	height?:number
	maxLines?:number
	textClipMode?:'None' | 'ClipToBounds'
	textLineBreakMode?:'WordWrap' | 'CharWrap' | 'Justify' | 'None'
	renderingOrder?:number
	visible?:boolean
	style?:any
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	highAccuracyEvents?:boolean
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onTransformUpdate?:Function
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroText extends Component<ViroTextProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

interface ViroGeometryProps {
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	vertices?:number[][]
	normals?:number[][]
	texcoords?:number[][]
	triangleIndices?:number[][]
	materials?:string[] | string
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onTransformUpdate?:Function
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Enables high accuracy event collision checks for this object.
	This can be useful for complex 3D objects where the default
	checking method of bounding boxes do not provide adequate
	collision detection coverage.
	
	NOTE: Enabling high accuracy event collision checks has a high
	performance cost and should be used sparingly / only when
	necessary.
	
	Flag is set to false by default. */
	highAccuracyEvents?:boolean
	highAccuracyGaze?:boolean
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroGeometry extends Component<ViroGeometryProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

/* Used to render a ViroSurface */
interface ViroSurfaceProps {
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	width?:number
	height?:number
	uvCoordinates?:number[]
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	arShadowReceiver?:boolean
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	style?:any
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroSurface extends Component<ViroSurfaceProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
}

/* Used to render a ViroQuad. */
interface ViroQuadProps {
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	width?:number
	height?:number
	uvCoordinates?:number[]
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	highAccuracyEvents?:boolean
	transformBehaviors?:string[] | string
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	arShadowReceiver?:boolean
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	style?:any
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroQuad extends Component<ViroQuadProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
}

interface ViroAnimatedImageProps {
	source:{ uri?:string } | number
	placeholderSource?:{ uri?:string } | number
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	width?:number
	height?:number
	resizeMode?:'ScaleToFill' | 'ScaleToFit' | 'StretchToFill'
	imageClipMode?:'None' | 'ClipToBounds'
	stereoMode?:'LeftRight' | 'RightLeft' | 'TopBottom' | 'BottomTop' | 'None'
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	highAccuracyEvents?:boolean
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	onTransformUpdate?:Function
	visible?:boolean
	style?:any
	paused?:boolean
	loop?:boolean
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	/* Callback triggered when we are processing the assets to be
	displayed in this ViroImage (either downloading / reading from file). */
	onLoadStart?:Function
	/* Callback triggered when we have finished processing assets to be
	displayed. Wether or not assets were processed successfully and
	thus displayed will be indicated by the parameter "success".
	For example:
	
	  _onLoadEnd(event:Event){
	     // Indication of asset loading success
	     event.nativeEvent.success
	  } */
	onLoadEnd?:Function
	/* Callback triggered when the image fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	renderingOrder?:number
	viroTag?:string
	onCollision?:Function
}
export class ViroAnimatedImage extends Component<ViroAnimatedImageProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
}

/* Used to render a ViroPolygon */
interface ViroPolygonProps {
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	opacity?:number
	vertices:number[][]
	holes?:number[][][]
	uvCoordinates?:number[]
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	highAccuracyEvents?:boolean
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	arShadowReceiver?:boolean
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	style?:any
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroPolygon extends Component<ViroPolygonProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
}

/* Composite controle for 2D button */
interface ViroButtonProps {
	/* The button image file, which is required */
	source:{ uri?:string } | number
	/* The image file, to be displayed when the user is hovering over it */
	hoverSource?:{ uri?:string } | number
	/* The image file, to be displayed when the user clicks the button */
	clickSource?:{ uri?:string } | number
	/* ##### DEPRECATION WARNING - this prop may be removed in future releases #####
	The image file, to be displayed when the user taps the button */
	tapSource?:{ uri?:string } | number
	/* ##### DEPRECATION WARNING - this prop may be removed in future releases #####
	The image file, to be displayed when the user is gazing over it */
	gazeSource?:{ uri?:string } | number
	position?:number[]
	scale?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	materials?:string[] | string
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	height?:number
	width?:number
	style?:any
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	ignoreEventHandling?:boolean
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroButton extends Component<ViroButtonProps> {
	public applyImpulse(force:any, atPosition:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
}

interface ViroSoundProps {
	source:string | { uri?:string } | number
	paused?:boolean
	loop?:boolean
	muted?:boolean
	volume?:number
	onFinish?:Function
	onError?:Function
}
export class ViroSound extends Component<ViroSoundProps> {
	public setNativeProps(nativeProps:any):any;
	public seekToTime(timeInSeconds:any):any;
	public preloadSounds(soundMap:any):Promise<any>;
	public unloadSounds(soundKeys:any):any;
}

interface ViroSoundFieldProps {
	source:string | { uri?:string } | number
	paused?:boolean
	loop?:boolean
	muted?:boolean
	volume?:number
	rotation?:number[]
	onFinish?:Function
	onError?:Function
}
export class ViroSoundField extends Component<ViroSoundFieldProps> {
	public setNativeProps(nativeProps:any):any;
	public seekToTime(timeInSeconds:any):any;
}

interface ViroSpatialSoundProps {
	source:string | { uri?:string } | number
	paused?:boolean
	loop?:boolean
	muted?:boolean
	volume?:number
	position?:number[]
	rolloffModel?:string
	minDistance?:number
	maxDistance?:number
	onFinish?:Function
	onError?:Function
}
export class ViroSpatialSound extends Component<ViroSpatialSoundProps> {
	public setNativeProps(nativeProps:any):any;
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public seekToTime(timeInSeconds:any):any;
}

interface ViroControllerProps {
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onControllerStatus?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:Function
	reticleVisibility?:boolean
	controllerVisibility?:boolean
}
export class ViroController extends Component<ViroControllerProps> {
	public getControllerForwardAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
}

/* Composite control for a 2D Spinner */
interface ViroSpinnerProps {
	position?:number[]
	rotation?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	scale?:number[]
	opacity?:number
	materials?:string[] | string
	animation?:{ interruptible?:boolean, name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean }
	transformBehaviors?:string[] | string
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	/* Spinner visual type for either a light or dark theme.
	This defaults to dark. */
	type?:'Dark' | 'Light'
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroSpinner extends Component<ViroSpinnerProps> {
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
}

interface ViroPolylineProps {
	points?:number[][]
	thickness?:number
	position?:number[]
	rotation?:number[]
	scale?:number[]
	closed?:boolean
	opacity?:number
	renderingOrder?:number
	visible?:boolean
	animation?:{ name?:string, delay?:number, loop?:boolean, onStart?:Function, onFinish?:Function, run?:boolean, interruptible?:boolean }
	transformBehaviors?:string[] | string
	/* Enables high accuracy event collision checks for this object.
	This can be useful for complex 3D objects where the default
	checking method of bounding boxes do not provide adequate
	collision detection coverage.
	
	NOTE: Enabling high accuracy event collision checks has a high
	performance cost and should be used sparingly / only when
	necessary.
	
	Flag is set to false by default. */
	highAccuracyEvents?:boolean
	lightReceivingBitMask?:number
	shadowCastingBitMask?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onTransformUpdate?:Function
	materials?:string[] | string
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	highAccuracyGaze?:boolean
	onDrag?:Function
	physicsBody?:{ type:'Dynamic' | 'Kinematic' | 'Static', mass?:number, restitution?:number, shape?:{ type:"Box" | "Sphere" | "Compound", params?:number[] }, friction?:number, useGravity?:boolean, enabled?:boolean, velocity?:number[], force?:{ value?:number[], position?:number[] }[] | { value?:number[], position?:number[] }, torque?:number[] }
	viroTag?:string
	onCollision?:Function
}
export class ViroPolyline extends Component<ViroPolylineProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public applyImpulse(force:any, position:any):any;
	public applyTorqueImpulse(torque:any):any;
	public setVelocity(velocity:any):any;
	public setNativeProps(nativeProps:any):any;
}

export const ViroConstants:any;

interface ViroParticleEmitterProps {
	position?:number[]
	rotation?:number[]
	scale?:number[]
	scalePivot?:number[]
	rotationPivot?:number[]
	onTransformUpdate?:Function
	renderingOrder?:number
	visible?:boolean
	viroTag?:string
	transformBehaviors?:string[] | string
	highAccuracyEvents?:boolean
	duration?:number
	delay?:number
	loop?:boolean
	run?:boolean
	fixedToEmitter?:boolean
	image:{ source:{ uri?:string } | number, height?:number, width?:number, bloomThreshold?:number, blendMode?:string }
	spawnBehavior?:{ emissionRatePerSecond?:number[], emissionRatePerMeter?:number[], particleLifetime?:number[], maxParticles?:number, emissionBurst?:{ time?:number, min?:number, max?:number, cycles?:number, cooldownPeriod?:number } | { distance?:number, min?:number, max?:number, cycles?:number, cooldownDistance?:number }[], spawnVolume?:{ shape?:string, params?:number[], spawnOnSurface?:boolean } }
	particleAppearance?:{ opacity?:{ initialRange?:number[], factor?:"Time" | "Distance", interpolation?:{ interval?:number[], endValue?:number }[] }, scale?:{ initialRange?:number[][], factor?:"Time" | "Distance", interpolation?:{ interval?:number[], endValue?:number[] }[] }, rotation?:{ initialRange?:number[], factor?:"Time" | "Distance", interpolation?:{ interval?:number[], endValue?:number }[] }, color?:{ initialRange?:any[], factor?:"Time" | "Distance", interpolation?:{ interval?:number[], endValue?:any }[] } }
	particlePhysics?:{ velocity?:{ initialRange?:number[][] }, acceleration?:{ initialRange?:number[][] }, explosiveImpulse?:{ impulse?:number, position?:number[], decelerationPeriod?:number } }
}
export class ViroParticleEmitter extends Component<ViroParticleEmitterProps> {
	public getTransformAsync():Promise<any>;
	public getBoundingBoxAsync():Promise<any>;
	public setNativeProps(nativeProps:any):any;
}

interface ViroLightingEnvironmentProps {
	/* The hdr image file, which is required */
	source:{ uri?:string } | number
	/* Callback triggered when we are processing the assets to be
	used in computing this lighting environment (either downloading / reading from file). */
	onLoadStart?:Function
	/* Callback triggered when we have finished processing assets to be
	used in computing this lighting environment. Wether or not assets were
	processed successfully will be indicated by the parameter "success".
	For example:
	
	  _onLoadEnd(event:Event){
	     // Indication of asset loading success
	     event.nativeEvent.success
	  } */
	onLoadEnd?:Function
	/* Callback triggered when the hdr image fails to load. Invoked with
	{nativeEvent: {error}} */
	onError?:Function
}
export class ViroLightingEnvironment extends Component<ViroLightingEnvironmentProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Viro3DSceneNavigator is used to transition between multiple scenes. */
interface Viro3DSceneNavigatorProps {
	/* A flag to enable/disable some debug features */
	debug?:boolean
	apiKey:string
	/* ViroSceneNavigator uses "scene" objects like the following to
	describe a scene. */
	initialScene:{ scene:Function }
	/* Called when either the user physically decides to exit vr (hits
	the "X" buton). */
	onExitViro?:Function
	/* Renderer settings that can be used to enable or disable various
	renderer capabilities and algorithms. */
	hdrEnabled?:boolean
	pbrEnabled?:boolean
	bloomEnabled?:boolean
	shadowsEnabled?:boolean
	multisamplingEnabled?:boolean
	viroAppProps?:any
}
export class Viro3DSceneNavigator extends Component<Viro3DSceneNavigatorProps> {
	public getRandomTag():any;
	/* Pushes a scene and reference it with the given key if provided.
	If the scene has been previously pushed, we simply show the scene again.
	Note that the back history order of which scenes were pushed is preserved.
	Also note that scenes are reference counted and only a unique set of
	scenes are stored and mapped to within sceneDictionary.
	
	Can take in either 1 or two parameters in the form:
	push ("sceneKey");
	push ("sceneKey", scene);
	push (scene); */
	public push(param1:any, param2:any):any;
	/* Replace the top scene in the stack with the given scene. The remainder of the back
	history is kept in the same order as before.
	
	Can take in either 1 or two parameters in the form:
	replace ("sceneKey");
	replace ("sceneKey", scene);
	replace (scene); */
	public replace(param1:any, param2:any):any;
	/* Jumps to a given scene that had been previously pushed. If the scene was not pushed, we
	then push and jump to it. The back history is re-ordered such that jumped to scenes are
	re-ordered to the front. As such, only the back order of sequential jumps are preserved.
	
	Can take in either 1 or two parameters in the form:
	jump ("sceneKey");
	jump ("sceneKey", scene);
	jump (scene); */
	public jump(param1:any, param2:any):any;
	public pop():any;
	public popN(n:number):any;
	/* Increments the reference count for a scene within sceneDictionary that is
	mapped to the given sceneKey. If no scenes are found / mapped, we create
	one, initialize it with a reference count of 1, and store it within the
	sceneDictionary for future reference. */
	public incrementSceneReference(scene:any, scenekey:string, limitOne:boolean):any;
	/* Decrements the reference count for the last N scenes within
	the sceneHistory by 1. If nothing else references that given scene
	(counts equals 0), we then remove that scene from sceneDictionary. */
	public decrementReferenceForLastNScenes(n:any):any;
	/* Adds the given sceneKey to the sceneHistory and updates the currentSceneIndex to point
	to the scene on the top of the history stack (the most recent scene). */
	public addToHistory(sceneKey:string):any;
	/* Instead of preserving history, we find the last pushed sceneKey within the history stack
	matching the given sceneKey and re-order it to the front. We then update the
	currentSceneIndex to point to the scene on the top of the history stack
	(the most recent scene). */
	public reorderHistory(sceneKey:string):any;
	public popHistoryByN(n:any):any;
	public getSceneIndex(sceneTag:any):any;
}

/* ViroVRSceneNavigator is used to transition between multiple scenes. */
interface ViroVRSceneNavigatorProps {
	/* Calling vrModeEnabled allows switching to and from VR mode.
	When set to false, it transitions back to pre-VR (mono) mode.
	When set to true, we set thie view into a full VR mode.
	This is set to true by default. */
	vrModeEnabled?:boolean
	/* A flag to enable/disable some debug features */
	debug?:boolean
	apiKey:string
	/* ViroSceneNavigator uses "scene" objects like the following to
	describe a scene. */
	initialScene:{ scene:Function }
	/* Called when either the user physically decides to exit vr (hits
	the "X" buton). */
	onExitViro?:Function
	/* Renderer settings that can be used to enable or disable various
	renderer capabilities and algorithms. */
	hdrEnabled?:boolean
	pbrEnabled?:boolean
	bloomEnabled?:boolean
	shadowsEnabled?:boolean
	multisamplingEnabled?:boolean
	viroAppProps?:any
}
export class ViroVRSceneNavigator extends Component<ViroVRSceneNavigatorProps> {
	public getRandomTag():any;
	/* Pushes a scene and reference it with the given key if provided.
	If the scene has been previously pushed, we simply show the scene again.
	Note that the back history order of which scenes were pushed is preserved.
	Also note that scenes are reference counted and only a unique set of
	scenes are stored and mapped to within sceneDictionary.
	
	Can take in either 1 or two parameters in the form:
	push ("sceneKey");
	push ("sceneKey", scene);
	push (scene); */
	public push(param1:any, param2:any):any;
	/* Replace the top scene in the stack with the given scene. The remainder of the back
	history is kept in the same order as before.
	
	Can take in either 1 or two parameters in the form:
	replace ("sceneKey");
	replace ("sceneKey", scene);
	replace (scene); */
	public replace(param1:any, param2:any):any;
	/* Jumps to a given scene that had been previously pushed. If the scene was not pushed, we
	then push and jump to it. The back history is re-ordered such that jumped to scenes are
	re-ordered to the front. As such, only the back order of sequential jumps are preserved.
	
	Can take in either 1 or two parameters in the form:
	jump ("sceneKey");
	jump ("sceneKey", scene);
	jump (scene); */
	public jump(param1:any, param2:any):any;
	public pop():any;
	public popN(n:number):any;
	/* Increments the reference count for a scene within sceneDictionary that is
	mapped to the given sceneKey. If no scenes are found / mapped, we create
	one, initialize it with a reference count of 1, and store it within the
	sceneDictionary for future reference. */
	public incrementSceneReference(scene:any, scenekey:string, limitOne:boolean):any;
	/* Decrements the reference count for the last N scenes within
	the sceneHistory by 1. If nothing else references that given scene
	(counts equals 0), we then remove that scene from sceneDictionary. */
	public decrementReferenceForLastNScenes(n:any):any;
	/* Adds the given sceneKey to the sceneHistory and updates the currentSceneIndex to point
	to the scene on the top of the history stack (the most recent scene). */
	public addToHistory(sceneKey:string):any;
	/* Instead of preserving history, we find the last pushed sceneKey within the history stack
	matching the given sceneKey and re-order it to the front. We then update the
	currentSceneIndex to point to the scene on the top of the history stack
	(the most recent scene). */
	public reorderHistory(sceneKey:string):any;
	public popHistoryByN(n:any):any;
	public getSceneIndex(sceneTag:any):any;
}

/* ViroARSceneNavigator is used to transition between multiple AR Scenes. */
interface ViroARSceneNavigatorProps {
	apiKey:string
	/* ViroARSceneNavigator uses "scene" objects like the following to
	describe a scene. */
	initialScene:{ scene:Function }
	autofocus?:boolean
	/* iOS only props! Note: these props may change as the underlying platforms coalesce in features. */
	worldAlignment?:'Gravity' | 'GravityAndHeading' | 'Camera'
	videoQuality?:'High' | 'Low'
	numberOfTrackedImages?:number
	/* Renderer settings that can be used to enable or disable various
	renderer capabilities and algorithms. */
	hdrEnabled?:boolean
	pbrEnabled?:boolean
	bloomEnabled?:boolean
	shadowsEnabled?:boolean
	multisamplingEnabled?:boolean
	viroAppProps?:any
}
export class ViroARSceneNavigator extends Component<ViroARSceneNavigatorProps> {
	public getRandomTag():any;
	/* Pushes a scene and reference it with the given key if provided.
	If the scene has been previously pushed, we simply show the scene again.
	Note that the back history order of which scenes were pushed is preserved.
	Also note that scenes are reference counted and only a unique set of
	scenes are stored and mapped to within sceneDictionary.
	
	Can take in either 1 or two parameters in the form:
	push ("sceneKey");
	push ("sceneKey", scene);
	push (scene); */
	public push(param1:any, param2:any):any;
	/* Replace the top scene in the stack with the given scene. The remainder of the back
	history is kept in the same order as before.
	
	Can take in either 1 or two parameters in the form:
	replace ("sceneKey");
	replace ("sceneKey", scene);
	replace (scene); */
	public replace(param1:any, param2:any):any;
	/* Jumps to a given scene that had been previously pushed. If the scene was not pushed, we
	then push and jump to it. The back history is re-ordered such that jumped to scenes are
	re-ordered to the front. As such, only the back order of sequential jumps are preserved.
	
	Can take in either 1 or two parameters in the form:
	jump ("sceneKey");
	jump ("sceneKey", scene);
	jump (scene); */
	public jump(param1:any, param2:any):any;
	public pop():any;
	public popN(n:number):any;
	/* Increments the reference count for a scene within sceneDictionary that is
	mapped to the given sceneKey. If no scenes are found / mapped, we create
	one, initialize it with a reference count of 1, and store it within the
	sceneDictionary for future reference. */
	public incrementSceneReference(scene:any, scenekey:string, limitOne:boolean):any;
	/* Decrements the reference count for the last N scenes within
	the sceneHistory by 1. If nothing else references that given scene
	(counts equals 0), we then remove that scene from sceneDictionary. */
	public decrementReferenceForLastNScenes(n:any):any;
	/* Adds the given sceneKey to the sceneHistory and updates the currentSceneIndex to point
	to the scene on the top of the history stack (the most recent scene). */
	public addToHistory(sceneKey:string):any;
	/* Instead of preserving history, we find the last pushed sceneKey within the history stack
	matching the given sceneKey and re-order it to the front. We then update the
	currentSceneIndex to point to the scene on the top of the history stack
	(the most recent scene). */
	public reorderHistory(sceneKey:string):any;
	public popHistoryByN(n:any):any;
	public getSceneIndex(sceneTag:any):any;
}

interface ViroARSceneProps {
	displayPointCloud?:{ imageSource?:{ uri?:string } | number, imageScale?:number[], maxPoints?:number } | boolean
	ignoreEventHandling?:boolean
	anchorDetectionTypes?:string[] | string
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onCameraARHitTest?:Function
	onARPointCloudUpdate?:Function
	onCameraTransformUpdate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	onTrackingUpdated?:Function
	onPlatformUpdate?:Function
	onAmbientLightUpdate?:Function
	onAnchorFound?:Function
	onAnchorUpdated?:Function
	onAnchorRemoved?:Function
	/* Describes the acoustic properties of the room around the user */
	soundRoom?:{ size:number[], wallMaterial?:string, ceilingMaterial?:string, floorMaterial?:string }
	physicsWorld?:{ gravity:number[], drawBounds?:boolean }
	postProcessEffects?:string[]
	/* ##### DEPRECATION WARNING - this prop may be removed in future releases ##### */
	onTrackingInitialized?:Function
}
export class ViroARScene extends Component<ViroARSceneProps> {
	public findCollisionsWithRayAsync(from:any, to:any, closest:any, viroTag:any):Promise<any>;
	public findCollisionsWithShapeAsync(from:any, to:any, shapeString:any, shapeParam:any, viroTag:any):Promise<any>;
	public performARHitTestWithRay(ray:any):Promise<any>;
	public performARHitTestWithWorldPoints(origin:any, destination:any):Promise<any>;
	public performARHitTestWithPosition(position:any):Promise<any>;
	public performARHitTestWithPoint(x:any, y:any):Promise<any>;
	/* ##### DEPRECATION WARNING - this prop may be removed in future releases ##### */
	public getCameraPositionAsync():Promise<any>;
	public getCameraOrientationAsync():Promise<any>;
	public getCameraPositionAsync():Promise<any>;
}

/* Container for Viro Components anchored to a detected plane. */
interface ViroARPlaneProps {
	anchorId?:string
	minHeight?:number
	minWidth?:number
	alignment?:"Horizontal" | "HorizontalUpward" | "HorizontalDownward" | "Vertical"
	pauseUpdates?:boolean
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	onCollision?:Function
	viroTag?:string
	onAnchorFound?:Function
	onAnchorUpdated?:Function
	onAnchorRemoved?:Function
}
export class ViroARPlane extends Component<ViroARPlaneProps> {
	public setNativeProps(nativeProps:any):any;
}

/* This component wraps the logic required to enable user selection
of an AR plane. This currently only allows for 1 plane to be selected,
but could easily be modified to allow for more planes. */
interface ViroARPlaneSelectorProps {
	maxPlanes?:number
	minHeight?:number
	minWidth?:number
	alignment?:"Horizontal" | "HorizontalUpward" | "HorizontalDownward" | "Vertical"
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	onCollision?:Function
	viroTag?:string
	onAnchorFound?:Function
	onAnchorUpdated?:Function
	onAnchorRemoved?:Function
	onPlaneSelected?:Function
}
export class ViroARPlaneSelector extends Component<ViroARPlaneSelectorProps> {
	public reset():any;
}

export const ViroARTrackingTargets:any;

/* Container for Viro Components anchored to a detected image. */
interface ViroARImageMarkerProps {
	target?:string
	pauseUpdates?:boolean
	renderingOrder?:number
	visible?:boolean
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	onCollision?:Function
	viroTag?:string
	onAnchorFound?:Function
	onAnchorUpdated?:Function
	onAnchorRemoved?:Function
}
export class ViroARImageMarker extends Component<ViroARImageMarkerProps> {
	public setNativeProps(nativeProps:any):any;
}

/* Container for Viro Components anchored to a detected object. */
interface ViroARObjectMarkerProps {
	target?:string
	pauseUpdates?:boolean
	visible?:boolean
	opacity?:number
	ignoreEventHandling?:boolean
	dragType?:"FixedDistance" | "FixedDistanceOrigin" | "FixedToWorld" | "FixedToPlane"
	dragPlane?:{ planePoint?:number[], planeNormal?:number[], maxDistance?:number }
	onHover?:Function
	onClick?:Function
	onClickState?:Function
	onTouch?:Function
	onScroll?:Function
	onSwipe?:Function
	onDrag?:Function
	onPinch?:Function
	onRotate?:Function
	onFuse?:{ callback:Function, timeToFuse?:number } | Function
	onCollision?:Function
	viroTag?:string
	onAnchorFound?:Function
	onAnchorUpdated?:Function
	onAnchorRemoved?:Function
}
export class ViroARObjectMarker extends Component<ViroARObjectMarkerProps> {
	public setNativeProps(nativeProps:any):any;
}

interface ViroARCameraProps {
}
export class ViroARCamera extends Component<ViroARCameraProps> {
}

}