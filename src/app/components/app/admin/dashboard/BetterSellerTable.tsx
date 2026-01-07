import React from 'react';
import BetterSellerTableClient from './BetterSellerTableClient';

type Props = {
  dateRange: any;
};

export default function BetterSellerTable({ dateRange }: Props) {
  return <BetterSellerTableClient dataSource={[]} dateRange={dateRange} />;
}