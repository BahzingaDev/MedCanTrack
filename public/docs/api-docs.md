# API Documentation for MedCanTrack

## Overview
The MedCanTrack API provides endpoints for accessing information about various cannabis strains, their cannabinoid and terpene profiles, and recommendations for health conditions. This API is designed to assist users in finding suitable strains for their health needs and understanding the effects of different cannabinoids and terpenes.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Get All Strains
- **Endpoint:** `/strains`
- **Method:** GET
- **Description:** Retrieves a list of all cannabis strains available in the database.
- **Response:**
  - **200 OK**
    - Returns an array of strain objects.

### 2. Get Strain by Name
- **Endpoint:** `/strains/:name`
- **Method:** GET
- **Description:** Retrieves detailed information about a specific strain by its name.
- **Parameters:**
  - `name` (string): The name of the cannabis strain.
- **Response:**
  - **200 OK**
    - Returns a strain object.
  - **404 Not Found**
    - If the strain does not exist.

### 3. Get Strains for Health Condition
- **Endpoint:** `/health-conditions/:condition`
- **Method:** GET
- **Description:** Retrieves a list of strains suitable for a specific health condition.
- **Parameters:**
  - `condition` (string): The health condition to find strains for.
- **Response:**
  - **200 OK**
    - Returns an array of strain objects.
  - **404 Not Found**
    - If no strains are found for the condition.

### 4. Get Cannabinoid Information
- **Endpoint:** `/cannabinoids`
- **Method:** GET
- **Description:** Retrieves a list of all cannabinoids and their properties.
- **Response:**
  - **200 OK**
    - Returns an array of cannabinoid objects.

### 5. Get Terpene Information
- **Endpoint:** `/terpenes`
- **Method:** GET
- **Description:** Retrieves a list of all terpenes and their properties.
- **Response:**
  - **200 OK**
    - Returns an array of terpene objects.

## Usage
To use the API, send requests to the specified endpoints using a tool like Postman or through your application. Ensure that the server is running and accessible at the base URL.

## Authentication
Currently, the API does not require authentication. Future versions may implement API keys or other authentication methods.

## Error Handling
The API returns standard HTTP status codes to indicate the success or failure of requests. In case of an error, a message will be included in the response body to provide more context.

## Conclusion
This API serves as a comprehensive resource for users seeking information about medical cannabis strains in the UK. For further inquiries or support, please refer to the project's README or contact the development team.