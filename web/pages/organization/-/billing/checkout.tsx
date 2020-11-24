import { NextPage } from "next";

import { withApollo } from "apollo/withApollo";
import Page from "components/Page";
import EditBilling from "ee/components/organization/billing/Checkout";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { OrganizationByName, OrganizationByNameVariables } from "apollo/types/OrganizationByName";
import { QUERY_ORGANIZATION } from "apollo/queries/organization";
import { toBackendName } from "lib/names";
import ErrorPage from "components/ErrorPage";
import Loading from "components/Loading";

const CheckoutPage: NextPage = () => {
  const router = useRouter();

  if (typeof router.query.organization_name !== "string") {
    return <ErrorPage statusCode={404} />;
  }
  const organizationName = toBackendName(router.query.organization_name);

  const { loading, error, data } = useQuery<OrganizationByName, OrganizationByNameVariables>(QUERY_ORGANIZATION, {
    variables: { name: organizationName },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <Page title={organizationName}>
        <Loading justify="center" />
      </Page>
    );
  }

  if (error || !data) {
    return <ErrorPage apolloError={error} />;
  }

  const organization = data.organizationByName;

  if (organization.__typename === "PrivateOrganization") {
    return (
      <Page title="Checkout" contentMarginTop="normal" maxWidth="md">
        <EditBilling organization={organization} />
      </Page>
    );
  } else {
    return (
      <ErrorPage />
    );
  }

};

export default withApollo(CheckoutPage);
