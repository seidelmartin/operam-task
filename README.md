# Beginning

Before you start running any of commands please run command `npm run prepare` which basically installs all dependencies for frontend and backend.
Server has been developed in node version `11.10.1` but should be compatible with version `10.x.x`. I've used typescript for backend part because I prefer typed languages over dynamic and it also brings some kind of self documenting code.

# 1. Parsing XML file

You can test the parsing of XML by running command `npm run start:flattenTree`. This command parses the XML file and writes `flattened.json` file into folder `resources` which contains those tuples as requested.

# 2. Storing data

I've decided to store the data in memory as instance of `FlattenedTaxonomy` class instead of proper database to simplify the task. 

This class keeps array of tuples ordered in a way that every parent is followed by its children. Otherwise I would store it in the SQL database (e.g. Postgres) so I can query data in this kind of order (alphabetical order should give similar result as the order of `FlattenedTaxonomy`).

# 3. Reconstruction of tree

You can test reconstruction of tree by running command `npm run start:createTree`. This command parses the XML and outputs the file `tree.json` to `resources` folder.

The algorithm goes sequentially through the flattened records and split the name by `>` character. It creates instance of `TaxonomyNode` for each of records and then calls method `addChild` with 2 parameters. First one is node and second one is the path of node. The node checks the path and if it's child of the node then it puts the child to it, otherwise it goes deeper to tree.

The complexity of algorithm should be `O(n)` because it goes through the list of flattened items just ones and `addChild` method just compares and selecting node parent node from dictionary which should have complexity `O(1)`.

The `TaxonomyNode` also supports filtering of nodes which basically goes through the tree and checks whether string matches the name of node. If node has children then it goes deeper to the leaves and tries to match the string in leaves. If at least one of the children matches the string the node stays in tree. The complexity of filtering should be as well `O(n)` because in worse case scenario algorithm has to go through all nodes.

# 4. API and frontend

There has been made simple API with one endpoint `GET /tree` with optional query parameter `filter`.

The frontend is written in React and shows the tree as list and inner lists for children. You can click on item and it shows the children if any.
