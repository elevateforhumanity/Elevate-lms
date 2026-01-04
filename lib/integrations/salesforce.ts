/**
 * Salesforce API Integration
 */

interface ContactData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface OpportunityData {
  name: string;
  closeDate: string;
  stageName: string;
  amount: number;
}

/**
 * Create or update a contact in Salesforce
 */
export async function createOrUpdateContact(
  data: ContactData
): Promise<string | null> {
  const apiKey = process.env.SALESFORCE_API_KEY;
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;

  if (!apiKey || !instanceUrl) {
    return null;
  }

  try {
    // Check if contact exists
    const searchResponse = await fetch(
      `${instanceUrl}/services/data/v58.0/query?q=SELECT+Id+FROM+Contact+WHERE+Email='${encodeURIComponent(data.email)}'`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!searchResponse.ok) {
      return null;
    }

    const searchData = await searchResponse.json();

    if (searchData.records && searchData.records.length > 0) {
      // Update existing contact
      const contactId = searchData.records[0].Id;
      const updateResponse = await fetch(
        `${instanceUrl}/services/data/v58.0/sobjects/Contact/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FirstName: data.firstName,
            LastName: data.lastName,
            Phone: data.phone,
          }),
        }
      );

      if (!updateResponse.ok) {
        return null;
      }

      return contactId;
    } else {
      // Create new contact
      const createResponse = await fetch(
        `${instanceUrl}/services/data/v58.0/sobjects/Contact`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FirstName: data.firstName,
            LastName: data.lastName,
            Email: data.email,
            Phone: data.phone,
          }),
        }
      );

      if (!createResponse.ok) {
        return null;
      }

      const createData = await createResponse.json();
      return createData.id;
    }
  } catch (error: unknown) {
    return null;
  }
}

/**
 * Create an opportunity in Salesforce
 */
export async function createOpportunity(
  data: OpportunityData
): Promise<string | null> {
  const apiKey = process.env.SALESFORCE_API_KEY;
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;

  if (!apiKey || !instanceUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${instanceUrl}/services/data/v58.0/sobjects/Opportunity`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: data.name,
          CloseDate: data.closeDate,
          StageName: data.stageName,
          Amount: data.amount,
        }),
      }
    );

    if (!response.ok) {
      return null;
    }

    const responseData = await response.json();
    return responseData.id;
  } catch (error: unknown) {
    return null;
  }
}
