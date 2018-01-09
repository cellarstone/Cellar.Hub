

> Before running must be set : `export ASPNETCORE_ENVIRONMENT="Development"`


PLACE - solution for real world problem

SPACE

/ - root for some place


# Example of space hiearchy

## Building1
path = /

### Floor1
path = /building1

#### Room1
path = /building1/floor1

#### Room2
path = /building1/floor1

### Floor2
path = /building1

### Floor3
path = /building1


## Building2
path = /

## Building3
path = /



# Change hiearchy in spaces

## Original state

Space1
/

Subspace1
/space1

Subspace2
/space1

Space2
/

Space3
/

## Changed state - adding parent space

**Building1
/**

Space1
/building1

Subspace1
/building1/space1

Space2
/building1

Space3
/building1
