/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShiHelperData_Model = /* GraphQL */ `
  query GetShiHelperData_Model($hash: String!, $tone: Int!) {
    getShiHelperData_Model(hash: $hash, tone: $tone) {
      hash
      tone
      english
      simplified
      traditional
      pinyin
    }
  }
`;
export const fetchShiHelperData_Model_simplified = /* GraphQL */ `
  query FetchShiHelperData_Model_simplified($english: String!) {
    fetchShiHelperData_Model_simplified(english: $english) {
      hash
      tone
      english
      simplified
      traditional
      pinyin
    }
  }
`;
export const listShiHelperData_Models = /* GraphQL */ `
  query ListShiHelperData_Models(
    $filter: TableShiHelperData_ModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShiHelperData_Models(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        hash
        tone
        english
        simplified
        traditional
        pinyin
      }
      nextToken
    }
  }
`;
