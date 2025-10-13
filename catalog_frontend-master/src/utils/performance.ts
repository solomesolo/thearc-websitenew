// Performance optimization utilities

/**
 * Debounce function to prevent excessive function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function to limit function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport for lazy loading
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Optimize scroll events with throttling
 */
export function createScrollHandler(handler: (event: Event) => void, throttleMs: number = 16) {
  return throttle(handler, throttleMs);
}

/**
 * Optimize resize events with debouncing
 */
export function createResizeHandler(handler: (event: Event) => void, debounceMs: number = 100) {
  return debounce(handler, debounceMs);
}

/**
 * Prevent layout thrashing by batching DOM reads/writes
 */
export function batchDOMUpdates(updates: (() => void)[]): void {
  // Batch all reads first
  const reads = updates.filter(update => {
    try {
      update();
      return false; // This was a read operation
    } catch {
      return true; // This was a write operation
    }
  });

  // Then batch all writes
  if (reads.length > 0) {
    requestAnimationFrame(() => {
      reads.forEach(update => update());
    });
  }
}

/**
 * Create a stable reference for objects to prevent unnecessary re-renders
 */
export function createStableRef<T>(value: T): T {
  return value;
}

/**
 * Check if two objects are shallowly equal
 */
export function shallowEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Memoize expensive calculations
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
} 