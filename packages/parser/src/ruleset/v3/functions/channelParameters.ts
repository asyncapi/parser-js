export function channelParametersV3(channel: { value: { address: any; parameters: any; }; }, { report }: any) {
    const { address, parameters } = channel.value;
  
    if (!address && parameters && Object.keys(parameters).length > 0) {
      report({
        message: 'Channel has parameters but no valid address.',
      });
    } else if (address && parameters) {
      const missingParams = Object.keys(parameters).filter(param => !address.includes(`{${param}}`));
      
      if (missingParams.length > 0) {
        report({
          message: `Channel address is missing parameters: ${missingParams.join(', ')}`,
        });
      }
    }
};
  