import React from "react";
import Layout from "@theme/Layout";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .swagger-ui .version, 
  .swagger-ui pre.version, 
  .swagger-ui .version span {
    color: black !important; /* Adjust the color as needed */
  }
  .swagger-ui .parameters-col_name {
    min-width: 200px; /* Ensures a minimum width for the column */
  }
`;

export default function ApiDocs() {
  return (
    <Layout title="API Documentation">
      <GlobalStyle />
      <SwaggerUI
        url="minatokens-api.yaml"
        defaultModelsExpandDepth={-1}
        docExpansion="list"
        displayOperationId={false}
      />
    </Layout>
  );
}
