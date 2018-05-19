import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CellarSpace } from '../entities/CellarSpace';
import { CellarPlace } from '../entities/CellarPlace';
import { CellarSenzor } from '../entities/CellarSenzor';

//QUERIES object ----------------------------------

export type Query = {
  cellarspace: CellarSpace[];
  cellarplace: CellarPlace[];
  cellarsenzor: CellarSenzor[];
}


//SERVICE ------------------------------------------

@Injectable()
export class IotGraphqlService {

  
  constructor(private apollo: Apollo) { }

  readonly serviceGraphqlName = 'iot';


//-----------------------------------------
// --------------- QUERIES ----------------
//-----------------------------------------

  getSpaces(id: String): Observable<CellarSpace[]>{
    return this.apollo.use(this.serviceGraphqlName).watchQuery<Query>({
      pollInterval: 1000,
      query: gql`
        query GetSpace($id: String) {
          cellarspace(id: $id){
            id,
            name,
            state,
            image,
            path
          }
        }
      `,
      variables: {
        id: id,
      }
    })
      .valueChanges
      .pipe(
        map(({data}) => {
          let result = <CellarSpace[]>data.cellarspace;
          return result;
          }
        ));
  }

  getPlaces(): Observable<CellarPlace[]>{
    return this.apollo.use(this.serviceGraphqlName).watchQuery<Query>({
      pollInterval: 1000,
      query: gql`
        query GetPlace {
          cellarplace{
            id,
            name,
            path,
            country
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(({data}) => <CellarPlace[]>data.cellarplace)
      );
  }


  getSenzors(): Observable<CellarSenzor[]>{
    return this.apollo.use(this.serviceGraphqlName).watchQuery<Query>({
      pollInterval: 1000,
      query: gql`
        query GetSenzor {
          cellarsenzor{
            id,
            name,
            path,
            type,
            firmware,
            ipaddress,
            wifissid,
            wifipassword,
            mqtturl
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(({data}) => {
          let result = <CellarSenzor[]>data.cellarsenzor;
          return result;
        })
      );
  }



//-----------------------------------------
// ------------- MUTATIONS ----------------
//-----------------------------------------


  addSpace(item: CellarSpace) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation CreateSpace($name: String!, 
                            $state: String!, 
                            $image: String!, 
                            $path: String! ) {
          createCellarSpace(name: $name, 
                            state: $state, 
                            image: $image, 
                            path: $path) {
                                  id
                                  name,
                                  state,
                                  image,
                                  path
                }
              }
    `,
      variables: {
        name: item.name,
        state: item.state,
        image: item.image,
        path: item.path
      }
    })
  }


  deleteSpace(id: string) {
    this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation DeleteSpace($id: String!) {
        deleteCellarSpace(id: $id)
      }
    `,
      variables: {
        id: id
      }
    });
  }

  updateSpace(item: CellarSpace) {
    return this.apollo.use(this.serviceGraphqlName).mutate({
      mutation: gql`
      mutation UpdateSpace($id: String!, 
                          $name: String!, 
                          $state: String!, 
                          $image: String!, 
                          $path: String! ) {
            updateCellarSpace(id: $id,
                              name: $name, 
                              state: $state, 
                              image: $image, 
                              path: $path) {
                      id
                      name,
                      state,
                      image,
                      path
            }
}
    `,
      variables: {
        id: item.id,
        name: item.name,
        state: item.state,
        image: item.image,
        path: item.path
      }
    })
  }

}
