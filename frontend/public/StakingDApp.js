import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Coins, ArrowUpDown } from "lucide-react";

const StakingDApp = () => {
  // Mock state for demonstration
  const [account, setAccount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState('1000');
  const [rewards, setRewards] = useState('50');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock wallet connection
  const connectWallet = async () => {
    try {
      setLoading(true);
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAccount('0x1234...5678'); // Mock address
    } catch (err) {
      setError('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  // Mock staking function
  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setLoading(true);
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStakedBalance(prev => (parseFloat(prev) + parseFloat(stakeAmount)).toString());
      setStakeAmount('');
    } catch (err) {
      setError('Staking failed');
    } finally {
      setLoading(false);
    }
  };

  // Mock withdraw function
  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > parseFloat(stakedBalance)) {
      setError('Invalid withdrawal amount');
      return;
    }
    setLoading(true);
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStakedBalance(prev => (parseFloat(prev) - parseFloat(withdrawAmount)).toString());
      setWithdrawAmount('');
    } catch (err) {
      setError('Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Staking DApp</h1>
          <p className="text-gray-600">Stake your tokens and earn rewards</p>
        </div>

        {/* Connect Wallet Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!account ? (
              <Button onClick={connectWallet} disabled={loading}>
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Connected:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">{account}</code>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Staking Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Staking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Your Staked Balance</p>
                <p className="text-xl font-bold">{stakedBalance} Tokens</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Available Rewards</p>
                <p className="text-xl font-bold text-green-600">{rewards} Tokens</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Stake Amount</label>
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Amount to stake"
                  min="0"
                />
                <Button 
                  className="w-full mt-2" 
                  disabled={!account || loading}
                  onClick={handleStake}
                >
                  {loading ? 'Staking...' : 'Stake Tokens'}
                </Button>
              </div>
              <div>
                <label className="text-sm text-gray-600">Withdraw Amount</label>
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Amount to withdraw"
                  min="0"
                  max={stakedBalance}
                />
                <Button 
                  className="w-full mt-2" 
                  disabled={!account || loading}
                  onClick={handleWithdraw}
                >
                  {loading ? 'Withdrawing...' : 'Withdraw Tokens'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Staked</p>
                <p className="text-xl font-bold">5000 Tokens</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current APR</p>
                <p className="text-xl font-bold">12%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default StakingDApp;