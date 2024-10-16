function add(a: number, b: number): number {
  return a + b;
}

test('addition function should return the correct sum', () => {
  // Arrange
  const a = 5;
  const b = 10;
  const expectedSum = 15;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(expectedSum);
});
