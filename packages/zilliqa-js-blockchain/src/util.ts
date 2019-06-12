import { getAddress } from '@zilliqa-js/crypto';
import { TxParams } from '@zilliqa-js/account';
import { RPCResponse, TransactionObj } from '@zilliqa-js/core';
import { BN, Long } from '@zilliqa-js/util';

export function toTxParams(
  response: RPCResponse<TransactionObj, never>,
): TxParams {
  const {
    toAddr,
    senderPubKey,
    gasPrice,
    gasLimit,
    nonce,
    amount,
    receipt,
    version,
    ...rest
  } = <TransactionObj>response.result;

  return {
    ...rest,
    version: parseInt(version, 10),
    toAddr: getAddress(toAddr).checkSum,
    pubKey: senderPubKey.replace('0x', ''),
    gasPrice: new BN(gasPrice),
    gasLimit: Long.fromString(gasLimit, 10),
    amount: new BN(amount),
    nonce: parseInt(nonce, 10),
    receipt: {
      ...receipt,
      cumulative_gas: parseInt(receipt.cumulative_gas, 10),
    },
  };
}
