routerAdd('GET', '/getvars', async (c) => {
   return c.json(200, 
      {"FLY_MACHINE_ID": process.env.FLY_MACHINE_ID,
      "FLY_REGION": process.env.FLY_REGION,
      "FLY_APP_NAME": process.env.FLY_APP_NAME,
      "FLY_ALLOC_ID": process.env.FLY_ALLOC_ID,
      "FLY_PUBLIC_IP": process.env.FLY_PUBLIC_IP,
      "FLY_IMAGE_REF": process.env.FLY_IMAGE_REF,
      "FLY_MACHINE_VERSION": process.env.FLY_MACHINE_VERSION,
      "FLY_PRIVATE_IP": process.env.FLY_PRIVATE_IP,
      "FLY_PROCESS_GROUP": process.env.FLY_PROCESS_GROUP,
      "FLY_VM_MEMORY_MB": process.env.FLY_VM_MEMORY_MB,
      "PRIMARY_REGION": process.env.PRIMARY_REGION
   });
})
