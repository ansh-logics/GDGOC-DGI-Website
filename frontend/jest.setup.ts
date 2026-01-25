import "@testing-library/jest-dom";

class MockIntersectionObserver {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
  takeRecords() {
    return [];
  }
}

if (typeof window !== "undefined") {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
}

if (typeof global !== "undefined") {
  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
}

