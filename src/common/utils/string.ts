import numeral from 'numeral';
import React from 'react';

export function string2money(
  value: string | number,
  precision?: number,
): string {
  const fixed = '0'.repeat(precision || 0);
  return numeral(`${value}`).format(`0,0.${fixed}`);
}

export function string2number(value: string | number): string {
  return numeral(`${value}`).format('0,0');
}

export function money2number(value: string): number {
  return numeral(value).value() || 0;
}

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export function capitalize(value: string): string {
  const words = value.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(' ');
}

export function isString(node: React.ReactNode): node is string {
  return typeof node === 'string';
}
