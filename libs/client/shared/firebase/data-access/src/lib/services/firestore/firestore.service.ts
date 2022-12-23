import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getFirestore,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  query,
  getDocs,
  QueryConstraint,
  collectionGroup,
  limit,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { from, map } from 'rxjs';

import { FirestoreData } from '@lob/client/shared/firebase/data';

import { FirebaseAppService } from '../firebase-app/firebase-app.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  db!: Firestore;

  constructor(firebaseAppService: FirebaseAppService) {
    firebaseAppService.app$.subscribe({
      next: (app) => {
        this.db = getFirestore(app);
      }
    });
  }

  /**
   * adds the new document if it does not exist or overwrites it with the passed in values. requires the id field to exist on the payload regardless
   * if the collectionGroup param is provided it will be used when adding the document
   * @param tableName
   * @param payload
   * @returns
   */
  public addDocument(tableName: string, payload: FirestoreData, collectionGroup?: string) {
    const tableRef = collection(this.db, tableName, collectionGroup ?? '');
    return from(setDoc(doc(tableRef, payload.id), payload));
  }

  /**
   * updates the fields of the document that is matched by id
   * if the collectionGroup param is provided it will be used when adding the document
   * @param tableName
   * @param payload
   * @returns
   */
  public updateDocument(tableName: string, payload: FirestoreData, collectionGroup?: string) {
    const tableRef = collection(this.db, tableName, collectionGroup ?? '');
    return from(updateDoc(doc(tableRef, payload.id), { payload }));
  }

  /**
   *
   * @param tableName Get a document from a table by its id
   * @param id
   * @returns
   */
  public getDocumentById(tableName: string, id: string) {
    const docRef = doc(this.db, tableName, id);
    return from(getDoc(docRef)).pipe(
      map((res) => {
        if (res.exists()) {
          return res.data();
        } else {
          throw new HttpErrorResponse({
            status: HttpStatusCode.NotFound,
            statusText: `The document from the ${tableName} table with id ${id} was not found`
          });
        }
      })
    );
  }

  /**
   * get a document from a table by query,
   * @param tableName
   * @param queryConstraints
   * @returns
   */
  public getDocument(
    tableName: string,
    queryConstraints: QueryConstraint[],
    options: { orderBy?: string; limit?: number; collectionGroupName: string } = { collectionGroupName: '' }
  ) {
    const tableRef =
      options?.collectionGroupName?.length > 0 ? collectionGroup(this.db, options.collectionGroupName) : collection(this.db, tableName);
    if (options?.limit) {
      queryConstraints.push(limit(options.limit));
    }
    if (options?.orderBy) {
      queryConstraints.push(orderBy(options.orderBy));
    }
    const q = query(tableRef, ...queryConstraints);
    return from(getDocs(q)).pipe(
      map((res) => {
        return res.docs.map((doc) => doc.data);
      })
    );
  }

  /**
   * delete document from table with id
   * @param tableName
   * @param id
   * @returns
   */
  public deleteDocument(tableName: string, id: string) {
    const docRef = doc(this.db, tableName, id);
    return from(deleteDoc(docRef));
  }
}
