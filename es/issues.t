R  a|---- Resolved
x  a|---- Cancelled / invalidated
 B a|---- Breaking issue or crash
 M a|---- Milestone goal
 I a|---- General issue or improvement
 E a|---- Enlightenment-related improvement
 K a|---- Nice to have performance enhancement or tweak
A  a|---- Issue currently being worked on
@@@
 M b|0000:Working game.
 M b|0001:Servicable blueprint grid editing UI panel.
RI b|0002:Ability to set and remove frame sections from a blueprint grid.
 I b|0003:Menu and menu-item classes.
 I b|0004:Panels that automatically generate lists of buttons etc, based on menus.
 M b|0005:Ability to reify blueprints.
RI b|0006:Frame weight hill-connectivity error checking in blueprints.
 I b|0007:Ability for grid-tiles to reference other tiles by relative position vector.
RE b|0008:Elminiate old code leftover from bootstrap process.
RK b|0009:Set up a git repository and configure git.
RE b|0010:Remove unneccessary semicolons.
RI b|0011:Update title of HTML page to 'bluegame'.
 M b|0012:Ship combat UI panel.
 M b|0013:Ship combat state logic.
RI b|0014:Ability to place and remove components on a blueprint grid.
 I b|0015:Blueprint legality checking for components and component capacity.
 M b|0016:State-logic for conduits to link various components.
RI b|0017:Grid UI recognition of cursor input and translation of cursor pos to tilepos.
 K b|0018:Override toString() of various functions for ease of debug printing outputs
RI b|0019:Grid UI recognition of mousedown clicks on tiles.
 E b|0020:Update exception messages to be more descriptive and detailed.
RI b|0021:State representation of frame weights and data associated with frame weights.
 E b|0022:Seperate various blueprint, tile, etc data from ships.es into further files.
 I b|0023:State representation of component attributes and data associated with components.
 I b|0024:Overlay of selected component/frame in grid-editing UI on grid.
 E b|0025:Remove magic numbers and hardcoded values from ui_grids.es
RE b|0026:Create a frameweights.es that properly initialises (singleton-like?) frameweight objects.
AM b|0027:State-logic for components.
 I b|0028:Associating expected inputs/outputs with components for the purpose of conduits.
RI b|0029:Conduit-only components.
 I b|0030:Partially conduit components - generators, etc.
RE b|0031:Move component logic into components.es
RI b|0032:Basic display of components in blueprint grid UI
RI b|0033:Initialisation of an existing grid with default components at game begin for dev purposes
RE b|0034:Rework grid.lookup() to take seperate arguments for x and y, and all references to use ... or similar.
RI b|0035:Facing information for components and rotation operations for them
 M b|0036:Framework for handling of blueprint-creation errors and warning.
RE b|0037:Remove placeAt() and remove() functions of components/frames/etc, replace with sets and gets for tile and facing.
RE b|0038:Make frames/components/etc capable of holding tiles, positions, facings, etc, without being locked to grid (reified).
RE b|0039:Seperate blueprint code out into blueprints.es
 I b|0040:Graceful exception handling for UI frame/component placement errors
RI b|0041:State-holding frame/component placement tools in ui_grids.es
AI b|0042:Blueprints keep track of connectors.
AE b|0043:Make the tile-occupancy logic of frames and components inherit from a common class?
RE b|0044:Replace the inbuild ES6 setter of this.tile with explict function setTile() for frames and components
RI b|0045:Functions for connectors to access the tiles they link to and those tiles' other connectors via position.
 I b|0046:Blueprint-level error checking of connectors being immediately linked correctly.
 M b|0047:General state-level logic for resource movement, allocation, sources and sinks, etc.
 I b|0048:Components with internal resource state.
 I b|0049:Active logic for sources / sinks to output or draw resources.
 I b|0050:Active logic for conduits and connectors to facilitate flow of resources.
 I b|0051:Blueprint-level error checking of connectors being indefinitely linked correctly (ie, an eventual valid connection).
 I b|0052:More complex activity-logic for resource components: generators that burn a resource, weapons, etc.
 I b|0053:State-logic for weapon components.
RI b|0054:Grid ui that displays blueprint errors and warnings
 I b|0055:Blueprint-level error checking of connector loops
RI b|0056:UI display of components that respects rotation/facing status
 I b|0057:UI view with the ability to rotate vision of blueprint.
RI b|0058:UI tilepanels can display various indicators oriented according to facing relative to the tilepanel.
 E b|0059:UI display of components, connectors, and frames are all seperate UI-objects rather than just phantoms drawn by tilePanels.
AI b|0060:The concept of ticks as part of a ship's state, its blueprint's state, and the states of its components etc.
AI b|0061:The ability to have state logic that advances by tick.
 I b|0062:Generating event reports as part of advancing time ticks.
AI b|0063:A UI window/panel that displays event reports created due to advancing time.
 I b|0064:UI controls with the ability to pause/continue/jumpahead the flow of ticks.
RE b|0065:Split cspecs.es and components.es out into seperate files in a comps folder structure.
 E b|0066:Move functions for drawing from sources, sinks, etc out of individual interactors and into more general interactor classes.
 I b|0067:Replace the stub default Directive with actual situation-dependant directives that control the automated behaviour of components.
RI b|0068:Decide on "complex" facings vs. simple facings splitting complex-faced components into multiple types of component.
RE b|0069:Remove deprecated facing-related code.
RI b|0070:Implement ConnectorSpecs that behave in regards to Connectors as ComponentSpecs do in regards to Components.
RK b|0071:Replace uses of 'specs' with 'spec' when referring to a singular ComponentSpec / ConnectorSpec / etc.
 K b|0072:Make blueprint.checkHillProperty() and similar functions iterate through the blueprint's entity lists, not the backing matrix's keys.
 K b|0073:Replace .es files with .js files for better portability to Windows systems (or at least, the one I sometimes do dev on)
RE b|0074:Make all specs, all designs, and all instances inheirit certain functionalities from three common classes.
 E b|0075:Clean up and rationalise the file structure for occupants.