import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import {
  fetchOrganizations,
  addOrganization,
  editOrganization,
  deleteOrganization,
} from "../redux/organizationSlice";
import Organization from "./Organization";
import { IOrganization, OrganizationAction } from "../types";

const OrganizationList: FC = () => {
  const { organizations, status } = useSelector((state: RootState) => state.organizations);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const categoryIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const handleOrganizationAction = (
    action: OrganizationAction,
    index: number,
    value: IOrganization | null = null
  ) => {
    switch (action) {
      case "add":
        dispatch(
          addOrganization({
            id: 0,
            name: nameRef.current!.value,
            description: descriptionRef.current!.value,
            lat: Number(latRef.current!.value),
            long: Number(longRef.current!.value),
            photo: photoRef.current!.value,
            userId: user!.id,
            categoryId: Number(categoryIdRef.current!.value),
          })
        );
        nameRef.current!.value = "";
        descriptionRef.current!.value = "";
        latRef.current!.value = "";
        longRef.current!.value = "";
        photoRef.current!.value = "";
        categoryIdRef.current!.value = "";
        break;
      case "edit":
        dispatch(
          editOrganization({
            id: organizations[index].id,
            organization: value!,
          })
        );
        break;
      case "delete":
        dispatch(deleteOrganization(organizations[index].id));
        break;
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-center">Organizations</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="mb-3">Add New Organization</h3>
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            placeholder="Name"
          />
          <input
            ref={descriptionRef}
            type="text"
            className="form-control"
            placeholder="Description"
          />
          <input
            ref={latRef}
            type="number"
            className="form-control"
            placeholder="Latitude"
          />
          <input
            ref={longRef}
            type="number"
            className="form-control"
            placeholder="Longitude"
          />
          <input
            ref={photoRef}
            type="text"
            className="form-control"
            placeholder="Photo URL"
          />
          <input
            ref={categoryIdRef}
            type="number"
            className="form-control"
            placeholder="Category ID"
          />
          <button
            className="btn btn-primary w-100"
            onClick={() => handleOrganizationAction("add", 0)}
          >
            Add Organization
          </button>
        </div>
      </div>
      {status === "loading" && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {status === "success" && organizations.length === 0 && (
        <div className="alert" role="alert">
          No organizations found.
        </div>
      )}
      {status === "success" && organizations.length > 0 && (
        <div>
          {organizations.map((org, i) => (
            <Organization
              key={org.id}
              organization={org}
              index={i}
              handleOrganizationAction={handleOrganizationAction}
            />
          ))}
        </div>
      )}
      {status === "error" && (
        <div className="alert" role="alert">
          Failed to load organizations.
        </div>
      )}
    </div>
  );
};

export default OrganizationList;