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
 I b|0014:Ability to place and remove components on a blueprint grid.
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
