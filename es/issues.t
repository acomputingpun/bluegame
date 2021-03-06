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
RM b|0005:Ability to reify blueprints.
RI b|0006:Frame weight hill-connectivity error checking in blueprints.
RI b|0007:Ability for grid-tiles to reference other tiles by relative position vector.
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
RE b|0022:Seperate various blueprint, tile, etc data from ships.es into further files.
RI b|0023:State representation of component attributes and data associated with components.
 I b|0024:Overlay of selected component/frame in grid-editing UI on grid.
 E b|0025:Remove magic numbers and hardcoded values from ui_grids.es
RE b|0026:Create a frameweights.es that properly initialises (singleton-like?) frameweight objects.
AM b|0027:State-logic for components.
 I b|0028:Associating expected inputs/outputs with components for the purpose of conduits.
RI b|0029:Conduit-only components.
RI b|0030:Partially conduit components - generators, etc.
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
RI b|0042:Blueprints keep track of connectors.
RE b|0043:Make the tile-occupancy logic of frames and components inherit from a common class?
RE b|0044:Replace the inbuild ES6 setter of this.tile with explict function setTile() for frames and components
RI b|0045:Functions for connectors to access the tiles they link to and those tiles' other connectors via position.
RI b|0046:Blueprint-level error checking of connectors being immediately linked correctly.
 M b|0047:General state-level logic for resource movement, allocation, sources and sinks, etc.
RI b|0048:Components with internal resource state.
RI b|0049:Active logic for sources / sinks to output or draw resources.
RI b|0050:Active logic for conduits and connectors to facilitate flow of resources.
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
RE b|0066:Move functions for drawing from sources, sinks, etc out of individual interactors and into more general interactor classes.
 I b|0067:Replace the stub default Directive with actual situation-dependant directives that control the automated behaviour of components.
RI b|0068:Decide on "complex" facings vs. simple facings splitting complex-faced components into multiple types of component.
RE b|0069:Remove deprecated facing-related code.
RI b|0070:Implement ConnectorSpecs that behave in regards to Connectors as ComponentSpecs do in regards to Components.
RK b|0071:Replace uses of 'specs' with 'spec' when referring to a singular ComponentSpec / ConnectorSpec / etc.
 K b|0072:Make blueprint.checkHillProperty() and similar functions iterate through the blueprint's entity lists, not the backing matrix's keys.
RK b|0073:Replace .es files with .js files for better portability to Windows systems (or at least, the one I sometimes do dev on)
RE b|0074:Make all specs, all designs, and all instances inheirit certain functionalities from three common classes.
RE b|0075:Clean up and rationalise the file structure for occupants.
RI b|0076:Adding occupants to grids / grid-tiles sorts them into categories automatically.
RI b|0077:Code for sorting of occupants in 0076 uses occupant-specific true/false methods rather than instanceof.
RI b|0078:Locking/unlocking component designs onto grid automatically locks/unlocks associated connectors.
RI b|0079:Connector instances should be added to grid.occupants for instance grids.
RI b|0080:Reserving and consuming resources as part of resource pools.
RI b|0081:Attempting to reserve resources for components and handling failure/success.
 E b|0082:Implement "argument checking" via hacks.argPanic() for most (all?) functions
RI b|0083:Second-order and n-order recursive draws for consuming/reserving resources.
RI b|0084:Comparison and value-editing semantics for resources.
RI b|0085:UI for ship display has simple grid showing component layout.
 I b|0086:Unified code for drawing / reserving / consuming resources.
RI b|0087:Adding components to tiles sorts them into categories as per 0076, for any occupant-grid subclass.
 E b|0088:Remove references to frameweight by 'weight' and replace with 'spec'.
RI b|0089:Consolidate UI grid display panel functions into a general UI grid panel class that can be partially overridden.
RI b|0090:Seperate the ui_grids GridPanel definitions and the ui_grids grid-editing code.
 I b|0091:Basic message display ticker in ui_sbattles for output of advancing ship ticks.
 M b|0092:Code for handling and resolving ship-to-ship battles of 2 ships.
 M b|0093:Code for handling and resolving ship-to-ship battles of N ships.
RE b|0094:Rename reify() for the spec->design transform so there's no nomenclature overlap with the design->instance transform.
 E b|0095:Consider renaming Instances to Examples for less nomenclature overlap with the many other uses of the word Instance.
RI b|0096:Deprecate the 'tile' lookup property of Occupants - replace with 'anchorTile' or 'tiles'; equivalently, 'anchorPos' or 'poses'
 I b|0097:Remove the debug tripup code to catch calls to deprecated property Occupant.tile (as per 0096).
RI b|0098:Basic UI display of Connectors as part of TilePanels.
 M b|0099:Multi-tile components.
RE b|0100:Deprecate the setTile() and clearTile() functions of Occupants - replace with setAnchorTile()
RI b|0101:Fix connector instances incorrectly not being added as occupants to thier tiles when reified.
RI b|0102:Dictionary-based reify() implementation that preserves relative connectivity property.
RE b|0103:Rewrite reify() semantics to use iGrid.reify(occ) rather than occ.reify(iGrid)
RI b|0104:Code to attach connector designs to other connector designs, setting the _fusedConn property.
RI b|0105:Reserved resource bids not properly cleared from connectors
RI b|0106:Ability to draw from components with resource states (as sources).
RI b|0107:UI display of Connectors being linked or not linked to one another.
 I b|0108:Ability to manually link or unlink Connectors via UI commands.
AI b|0109:Split comps/specs.js into seperate files for different types of component (cable, weapon, etc)
RI b|0110:Implement position/facing validity checking for connector fusing and unfusing.
RK b|0111:Implement flag-specific console debug printing for ease of testing.
 E b|0112:Replace debug printing calls to console.log() with hacks.dlog() throughout code.
RE b|0113:Rename use of 'link' in connectors with 'fuse' for greater nomenclature clarity.
RI b|0114:Move duplicate code for lockToGrid() and unlock() functions to Occupant superclasses.
RI b|0115:Replace sanity checks at the beginning of lockToGrid() with call to canLock() / checkLock() functions.
 I b|0116:Improve error-checking in component.checkLock()
 I b|0117:Occupant.canLock() should check for specific exception types thrown by checkLock()
RI b|0118:UI display of connectors as seperate UI-objects rather than phantoms.
RI b|0119:Grid UI display keeps track of reflection objects and links them to the reflectors.
RI b|0120:Reflection objects should be correctly removed from existence when leaving scope (deleted, etc)
RI b|0121:Reflection objects for connectors should be added to scope in UI when tiles are modified.
 I b|0122:Graceful UI display of multiple connectors in single square/facing.
 I b|0123:Limited throughput capacity for cable components
RI b|0124:Sanity checks for connector.fuseTo() and component.unfuse()
RI b|0125:Seperate connector fusing and unfusing into fuse-to and (internal) fuse-from functions.
 M b|0126:A functional set of default components as a minimum viable feature for gameplay testing.
 I b|0127:Define a (stub, nonworking) set of default components for 0126
RI b|0128:UI display of components as seperate UI-objects rather than phantoms.
RE b|0129:Make various throw-exception statements throw errs.Panic()
 I b|0130:Implement error handling for less serious internal state errors so they don't need to result in a panic.
 I b|0131:Partial resource-drawing.
 M b|0132:System for damage to components/frames in ships.
RI b|0133:Generator components that consume one resource to produce another.
RI b|0134:Rotated component/connector facing not being handled correctly.
RI b|0135:Eliminate the './es/comps' folder and move contents back into base ./es
RI b|0136:General class for resource-source components such as tanks and batteries.
RI b|0137:General class for cable components.
RI b|0138:Unidirectional connectors that automatically refuse reserve attempts from the wrong direction.
RI b|0139:A function, called after an Instance is created and recursively linked, that can assign names and attach data to linked occupants (connectors, etc).
 I b|0140:Rework frames.js to use general Occupant lock() / unlock() functions.
RI b|0141:Fusing connectors performs sanity-checks of resource type / connector direction / etc.
RI b|0142:Disable right-click context menu for global canvas element.
 I b|0143:Differentiate left and right clicks.
 I b|0144:Highlight mouseover UI items (connectors, tiles, etc) in grid displays.
RI b|0145:Pretty debug printing functions for UI reflection objects (tilePanels, component reflections, etc)
 I b|0146:Cables that propogate component directionality.
 M b|0147:Generation of hull profiles around ships.
 I b|0148:State logic for recognising when a given ship is effectively 'dead'.
 I b|0149:Computer components that control ship activity in battle.
 I b|0150:Data cables/connectors for propagating input/output of commands from computer comps.
 I b|0151:Rewrite the component-specific advance() to use a centralised, ship-based advance().
RI b|0152:Create a general design for the mechanics of space battle resolution.
AI b|0153:Logic and mechanics for positioning of ships in a given space.
RE b|0154:Re-order calls to panel constructors so that 'parent' is the last argument.
 M b|0155:Servicable UI display of ship battles.
RI b|0156:UI Display of grids for multiple ships in battle reports.
RI b|0157:UI Display of ship-related battle report data such as facing, position, etc.
RI b|0158:UI display of ship locations on a linear chart in battle UI.
 I b|0159:Move warpTileMouseMove() and similar functions of GridPanel parents out of the parent class and into the grid class.
RI b|0160:Replace calls to warpReflMouseMove() with warpReflMouseMove() for better nomenclature consistency.
AM b|0161:Servicable ship control AI brain.
RI b|0162:Recalibrate ship orientation so that angle 0 is always subjectively facing towards the enemy.
RI b|0163:Implement orients.facingVec()
RI b|0164:Make fleets the primary subcomponents of battles, and ships the primary subcomponents of fleets.
RI b|0165:Ability of ships to reference other ships in a battle via relative position/facing.
RI b|0166:Automatic repositioning/reorientation of ships as they pass one another to maintain the distance invariant.
 M b|0167:Caching of calculated results based on state for all functions where this is reasonably practicable.
RB b|0168:Fix subtle caching bug caused by instances sharing function objects.
RI b|0169:Implement a hack for making a function automatically cache based on caller._dirtyID
 E b|0170:Rewrite code to make use of ES6's new private field / private method syntax.
RI b|0171:Basic ability to switch between UI display panels for development purposes.
RE b|0172:Simplify and rationalise the nomenclature of ship subjective/objective position/facing functions.
AI b|0173:Brains that are capable of firing weapon components.
 I b|0174:Reconfigure brains.getEnemyShip and similar lookups to use fleet-based categories.
 I b|0175:Ability for brains to identify and reference grid components at all.
 I b|0176:Ship components that store specific state/instructions.
AM b|0177:State-level semantic definitions for ship-to-ship attacks.
 I b|0178:State-logic for resolving single individual attacks.
 I b|0179:Attack logic able to calculate target-data modifiers.
 I b|0180:Attack logic able to calculate range modifiers.
 I b|0181:Attack logic able to calculate evasion modifiers.
 I b|0182:Attack logic able to calculate target profiles and target profile modifiers.
 I b|0183:Attack logic able to calculate exposed component strike points.