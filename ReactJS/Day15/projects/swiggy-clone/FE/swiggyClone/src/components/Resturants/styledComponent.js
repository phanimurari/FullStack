import styled from 'styled-components';

export const RestaurantsContainer = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const SortSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;
